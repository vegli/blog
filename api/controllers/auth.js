import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req,res) => {

    // PROVERA USERA DA LI POSTOJI
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q,[req.body.email,req.body.username], (err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("Korisnik vec postoji!")

        // Ne postoji user
        // bcryptjs za hash passworda i kreiranje usera
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)


        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES(?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json("Kreiran korisnik")
        })
    })
}

export const login = (req,res) => {

    // PROVERA DA LI POSTOJI KORISNIK

    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username], (err,data) => {
        if (err) return res.json(err);
        if(data.length === 0) return res.status(404).json("Korisnik ne postoji!")

        // PROVERA SIFRE, data vraca niz a prvi element tog niza je nas user!
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Pogresni kredencijali!")

        // SVE OK

        // JSON web token kako bi aplikacija znala u svakom trenutku KOJI user je ulogovan 
        // POST -> USER koji je napravio taj post je bitno jako!
        // OVo nam je bitno jer ne zelimo recimo da neki korisnik brise ili updejtuje postove drugih usera, samo svoje sme!

        // za sign koristimo user info koji ga identificita (ukiatan je id recimo)
        // token se cuva u Cookies , kada ocemo da obrisemo post npr aplikacija proverava nas web token
        // i ako je token user id isti kao i za taj post onda je sve OK
        const token = jwt.sign({id:data[0].id},"jwtkey");
        const {password, ...other} = data[0]

        // za koriscenje cookies koristimo bibliotkeu cookie-parser
        // nazivamo nas cookie, saljemo ga i za dodatan layer bezbednosti httpOnly sto znaci
        // bilo koja skripta u browseru i aplikaciji NE MOZE direktno pristupiti ovom cookie
        // vec samo indirektno preko API requestova
        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json(other) // jer ne zelimo i da nam vraca password vec samo ostale informacije


    })

}

export const logout = (req,res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("Odjavljeni korisnik!")
}
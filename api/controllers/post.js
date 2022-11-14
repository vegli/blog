import {db} from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req,res) => {
    const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat = ?"
    : "SELECT * FROM posts"

    db.query(q, [req.query.cat], (err,data) => {
        if(err) return res.status(500).send(err)

        return res.status(200).json(data)
    })
}




export const getPost = (req,res) => {
    const q = "SELECT p.id, `username`,`title`,`desc`,p.img, u.img AS userImg,`cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"

    // params ovde je onaj id u URL vidi posts.js u rute
    db.query(q,[req.params.id], (err,data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}

export const addPost = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Nemate pristup!")

    jwt.verify(token,"jwtkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token nije validan!") 
            const q = "INSERT INTO posts (`title`,`desc`,`img`,`cat`,`date`,`uid`)  VALUES(?)"
            const values = [
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.cat,
                req.body.date,
                // token vraca user info koji sadrzi user id
                userInfo.id
            ]

            db.query(q, [values], (err,data) =>{
                if(err) return res.status(500).json(err);
                return res.json("Kreiran post")
            })
    });

}

export const deletePost = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Nemate pristup!")

    jwt.verify(token,"jwtkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token nije validan!")

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        // Pogledaj auth.js u kontrolerima, vraca se id: data[0].id sto znaci da nam VRACA ID samo
        db.query(q,[postId,userInfo.id], (err,data)=>{
            if(err) return res.status(403).json("Ne mozete brisati ovaj post!")

            return res.json("Obrisan post!")
        })
    })
}

export const updatePost = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Nemate pristup!")

    jwt.verify(token,"jwtkey", (err,userInfo) => {
        if(err) return res.status(403).json("Token nije validan!") 

        const postId = req.params.id
        // PROVERAVAMO identitet kreatora posta sa ovim uid = ?  !
            const q = "UPDATE posts SET `title` = ?, `desc` = ?,`img` = ?,`cat` = ? WHERE `id` = ? AND `uid` = ?"
            const values = [
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.cat,
            ]

            db.query(q, [...values, postId, userInfo.id], (err,data) =>{
                if(err) return res.status(500).json(err);
                return res.json("Azuriran post")
            })
    });

}
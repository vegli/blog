// KONTEKST - user info u bilo kojoj komponenti, moramo da cuvamo u nekom zajednickom mestu.
// za to mozemo da korsitimo REDUX, ali nam ne treba jer ne menjamo user state stalno 
// vec samo se loginujemo i logoutujemo pa je bolje da se radi sa context API

// Dakle, potreban nam je user info u razlicitim komponentama, navbar, write page, post page itd
// info cuvamo dakle u ovom kontekstu

import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))

    const login = async(inputs) => {
        const res = await axios.post("/auth/login", inputs)
        setCurrentUser(res.data)
    }

    const logout = async(inputs) => {
        await axios.post("/auth/logout", inputs)
        setCurrentUser(null)
    }

    // updateovanje local storage svaki put kada se promeni user
    // useEffect hook za to
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    }, [currentUser])

    return (
        // ovime mi nase stanje (current user) i funkcije login i logout mozemo da koristimo BILO GDE u nasoj APLIKACIJI
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}


import React, { useEffect, useState } from 'react';
import { ContextValues } from './ContextValue';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

const provider = new GoogleAuthProvider()

const ContextProvider = ({children}) => {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)


const [mode, setMode] = useState(localStorage.getItem("theme") === "dark")

    useEffect(() => {
        if(mode) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        }
        else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [mode])


    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const updateUser = (profileInfo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, profileInfo)
    }

    const signOutUser = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            if(user) {
                setUser(user)
            }
            setLoading(false)

            return () => {
                unSubscribe()
            }
        })
    },[])

    console.log(user)


    const value = {
        registerUser,
        loginUser,
        googleSignIn,
        updateUser,
        signOutUser,
        user,
        setUser,
        setMode,
        mode,
    }

    return (
        <ContextValues value={value}>
            {children}
        </ContextValues>
)};

export default ContextProvider;
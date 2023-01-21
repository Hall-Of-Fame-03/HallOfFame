import {useContext, createContext, useEffect, useState, useRef} from "react";
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithRedirect, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";
import {auth} from '../firebase';
import { createUserCollection } from "./firestore-db";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const [user, setUser] = useState({});

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        var res = "";
        if(windowSize.current[0] > 768){
            res = await signInWithPopup(auth, provider);
        } else {
            res = await signInWithRedirect(auth, provider);
        }
        const user = res.user;
        await createUserCollection(user);
    };

    const logOut = () => {
        signOut(auth)
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser)
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
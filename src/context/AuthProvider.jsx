import React, { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { auth } from "../firebase/firebase-init";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const [loading , setLoading] = useState(true)
  const [theme, setTheme] = useState(
      localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    );

    const handleToggle = (e) => {
      setTheme(e.target.checked ? 'dark' : 'light');
    };

    useEffect(() => {
      localStorage.setItem('theme', theme);
      document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
  const unSubscribe =  onAuthStateChanged(auth, (currentUser) => {
      
        setUser(currentUser);
    setLoading(false)
      
    });
    return () => {
      unSubscribe()
    }
  }, []);
  // console.log(user);
  const googleLogin = () => {
    setLoading(true)
   return signInWithPopup(auth, provider)
      
  };
  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  };
  const userInfo = {
    createUser,
    loginUser,
    logOut,
    user,
    setUser,
    googleLogin,
    loading,
    handleToggle,
    theme
  };
  return (
    <div>
      <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style : {zIndex : 9999} }}/>
    </div>
  );
};

export default AuthProvider;

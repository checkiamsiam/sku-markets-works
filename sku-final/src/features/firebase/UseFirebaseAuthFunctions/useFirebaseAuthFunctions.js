import { initializeApp } from 'firebase/app';
import { getAuth, getIdToken, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import firebaseConfig from '../FirebaseConfig/FirebaseConfig';


initializeApp(firebaseConfig);
const auth = getAuth();


const useFirebaseAuthFunctions = () => {
    const [isLoggedIn, SetIsLoggedIn] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';


    //* Sent error message
    const sentErrorMessage = () => {
        return errorMessage
    }


    //* Sign Up (Create) New User By (Email/Password)
    // const createNewUserWithEmailAndPassword = async (email, password, retypePassword) => {
    //     createUserWithEmailAndPassword(auth, email, password, retypePassword)
    //         .then((userCredential) => {
    //             // Signed Up 
    //             const user = userCredential.user;
    //             console.log(user)
    //             verifyEmail()
    //             setErrorMessage("")
    //             navigate("/signin")
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log("Sign In email and password Error Are :", errorCode, errorMessage)
    //             setErrorMessage(errorCode);
    //         });
    // }


    //* Email Verification
    // const verifyEmail = () => {
    //     sendEmailVerification(auth.currentUser)
    //         .then(() => {
    //             // Email verification sent!
    //             alert("Sign Up Successfully! Please Activate Your Email")
    //         });
    // }


    //* SignIn (Login) Authentication By (Email/Password)
    // const signInEmailAndPassword = (email, password) => {
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in 
    //             const user = userCredential.user;
    //             const { displayName, email, photoURL, emailVerified } = user;
    //             const loggedInUser = {
    //                 name: displayName || "To Travelez",
    //                 email: email,
    //                 photo: photoURL,
    //                 emailVerified: emailVerified
    //             }
    //             console.log(displayName, email, photoURL, emailVerified);
    //             // console.log(user);
    //             if (user && user.emailVerified) {
    //                 SetIsLoggedIn(loggedInUser)
    //                 setErrorMessage("");
    //                 navigate(from, { replace: true });
    //                 // navigate('/')
    //             }
    //             else {
    //                 console.log("enter");
    //                 setErrorMessage("Check Email! Verify First")
    //             }
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log("Sign In Error Are :", errorCode, errorMessage)
    //             setErrorMessage(errorCode);
    //         });
    // }


 

    //* Sign Out
    // const SignOut = () => {
    //     signOut(auth)
    //         .then(() => {
    //             SetIsLoggedIn({})
    //             // console.log("Sign-out successful.");
    //         })
    //         .catch((error) => {
    //             console.log("Sign Out Error Are :", error);
    //         });
    // }


    //* Reset Password 
    const resetPassword = () => {
        const email = isLoggedIn.email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                alert("Reset Mail Sent Successfully")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }


    //* Get the currently signed-in user
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user);
                // User is signed in, see docs for a list of available properties
                // const uid = user.uid;
                // https://firebase.google.com/docs/reference/js/firebase.User
                getIdToken(user)
                    .then((idToken) => localStorage.setItem('idToken', idToken))
                SetIsLoggedIn(user)

            } else {
                // User is signed out
                SetIsLoggedIn({})
            }

            return () => unsubscribed
        });
    }, [])



    return {
        // isLoggedIn,
        // signInWithGoogle,
        // SignOut,
        // createNewUserWithEmailAndPassword,
        sentErrorMessage,
        // signInEmailAndPassword,
        resetPassword
    }
}
export default useFirebaseAuthFunctions
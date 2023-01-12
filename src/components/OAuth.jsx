import React from 'react';

import { FcGoogle } from "react-icons/fc";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';




const OAuth = () => {

    const navigate = useNavigate();

    async function onGoogleClick() {

        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            const docRef=doc(db,"users",user.uid);
            const docSnap=await getDoc(docRef);

            if(!docSnap.exists()){
                setDoc(docRef,{
                    name:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp()
                });
            };
            
            if (user) {
                navigate("/")
            };
            
        } catch (error) {
            toast.error("can't authenticate with google.");
            console.log(error);
        }
    }

    return (
        <div className='w-full rounded bg-red-600 py-3 flex  justify-center hover:bg-red-700 active:bg-red-800 transition ease-in-out duration-150'
            onClick={onGoogleClick}
        >
            <button type='button' className=' uppercase text-sm text-white font-semibold flex items-center'>
                <FcGoogle className='bg-white rounded-full h-6 w-6 mr-2' />
                continue with google
            </button>
        </div>

    )
}

export default OAuth;
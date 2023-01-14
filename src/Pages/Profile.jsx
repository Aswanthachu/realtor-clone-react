import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';

import { FcHome } from "react-icons/fc"
import Card from '../components/Card';

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { name, email } = formData;

  const LogOut = () => {
    auth.signOut();
    navigate('/');
  }

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const handleSubmit = async () => {
    setChangeDetails(prevState => !prevState);

    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        });

        // update name on firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name
        });
        toast.success("Profile details updated successfully..", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Could not update name of user", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  // async function onDelete(listingID) {
  //   if (window.confirm("Are you sure you want to delete?")) {
  //     await deleteDoc(doc(db, "listings", listingID));
  //     const updatedListings = listings.filter(
  //       (listing) => listing.id !== listingID
  //     );
  //     setListings(updatedListings);
  //     toast.success("Successfully deleted the listing");
  //   }
  // }

  // function onEdit(listingID) {
  //   navigate(`/edit-listing/${listingID}`);
  // }

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  return (
    <section className=' flex justify-center flex-col items-center max-w-6xl mx-auto mb-10'>
      <h1 className='text-3xl font-bold mt-6'>My Profile</h1>
      <form className='w-full max-w-6xl m-6 flex flex-col p-3'>
        <input type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
          disabled={!changeDetails}
          className={`w-full sm:w-[90%] md:w-[50%] rounded   mx-auto bg-white border-gray-500 transition ease-in-out p-3 mb-6 ${changeDetails && "bg-red-200"}`} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          disabled
          className={`w-full sm:w-[90%] md:w-[50%] rounded  mx-auto  bg-white border-gray-500 transition ease-in-out p-3`} />
        <div className='flex w-full sm:w-[90%] md:w-[50%]  mx-auto justify-between mt-6 whitespace-nowrap text-sm  sm:text-lg font-semibold'>
          <p>Do you want to change your name?<span className='text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer'
            onClick={handleSubmit}>{!changeDetails ? "Edit" : "Apply Change"}</span></p>
          <p onClick={LogOut} className='text-blue-600 hover:text-blue-800 cursor-pointer'>Sign out</p>
        </div>

        <button type='button' className='w-full mt-10 mx-auto flex items-center justify-center  p-3 bg-blue-600  rounded text-sm font-semibold text-white uppercase transition ease-in-out duration-150 hover:bg-blue-800 sm:w-[90%]  md:w-[50%]'>
          <Link to="/create-listing" className='flex items-center justify-center w-full'>
            <span className='bg-pink-300 w-6 h-6 rounded-full flex items-center justify-center border-white border-[2px] mr-2'>
              <FcHome />
            </span>
            sell or rent your home
          </Link>
        </button>
      </form>
      {
        // (!loading && listings.length > 0) 
        true && <>
          <h2 className='font-semibold text-2xl mb-[4rem]' >My Listings</h2>
 
          <ul className='w-full space-x-2 sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {
              arr.map((a, index) => (
                <Card key={index} />
              ))
            }
          </ul>
        </>
      }

    </section >
  )
}

export default Profile;
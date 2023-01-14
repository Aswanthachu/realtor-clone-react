import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

import Spinner from '../components/Spinner';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';


const CreateListings = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        beds: 1,
        baths: 1,
        parking: false,
        furnished: false,
        address: "",
        offer: false,
        regularPrice: "",
        discountedPrice: "",
        price: "",
        images: {},
        latitude: "",
        longitude: ""
    });

    

    const { type, name, beds, baths, parking, furnished, address, latitude, longitude, offer, regularPrice, images, discountedPrice, price } = formData;

    console.log(images);

    const handleChange = (e) => {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true
        }
        else if (e.target.value === "false") {
            boolean = false
        }
        if (e.target.type === "file") {
            setFormData(prevState => ({
                ...prevState,
                images: e.target.files
            }))
        } else {
            setFormData(prevState => ({
                ...prevState,
                [e.target.name]: boolean ?? e.target.value
            }))
        }
    };


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (+discountedPrice >= +regularPrice) {
          setLoading(false);
          toast.error("Discounted price needs to be less than regular price");
          return;
        }
        if (images.length > 6) {
          setLoading(false);
          toast.error("maximum 6 images are allowed");
          return;
        }
    
        async function storeImage(image) {
          return new Promise((resolve, reject) => {
            const storage = getStorage();
            const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                }
              },
              (error) => {
                // Handle unsuccessful uploads
                reject(error);
              },
              () => {
                
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL);
                });
              }
            );
          });
        }
    
        const imgUrls = await Promise.all(
          [...images].map((image) => storeImage(image))
        ).catch((error) => {
          setLoading(false);
          toast.error("Images not uploaded");
          return;
        });
    
        const formDataCopy = {
          ...formData,
          imgUrls,
        //   geolocation,
          timestamp: serverTimestamp(),
          userRef: auth.currentUser.uid,
        };
        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discountedPrice;
        delete formDataCopy.latitude;
        delete formDataCopy.longitude;
        const docRef = await addDoc(collection(db, "listings"), formDataCopy);
        setLoading(false);
        toast.success("Listing created");
        navigate(`/category/${formDataCopy.type}/${docRef.id}`);
      }

    if (loading) {
        return <Spinner />
    }

    return (
        <section className='w-full max-w-6xl flex items-center justify-center mx-auto flex-col'>
            <h1 className='text-3xl font-bold mt-6'>Create a Listing</h1>
            <form className='w-full sm:w-[90%] md:w-[70%] lg:w-[60%]'>
                <div className='mt-10 w-full px-20 mx-auto'>
                    <h2 className='flex justify-start text-lg font-semibold'>Sell / Rent</h2>
                    <div className='flex justify-start text-semibold uppercase '>
                        <button type="button" name='type' value="sell"
                            onClick={handleChange}
                            className={` w-[45%] py-3  rounded mr-[5%] shadow-lg font-semibold uppercase hover:shadow-2xl ${type === "sell" ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`}

                        >
                            sell
                        </button>
                        <button type="button" name="type" value="rent"
                            onClick={handleChange}
                            className={` w-[45%]  py-3  rounded shadow-lg font-semibold uppercase  hover:shadow-2xl ${type === "rent" ? "text-white bg-gray-700" : "bg-white text-gray-700"}`}>
                            rent
                        </button>
                    </div>
                </div>
                <div className='mt-10 w-full px-20 mx-auto'>
                    <h2 className='flex justify-start text-lg font-semibold'>Name</h2>
                    <div className='flex justify-start font-semibold uppercase '>
                        <input placeholder='Name' name='name' value={name}
                            onChange={handleChange}
                            className='w-[95%] p-3 rounded border border-gray-300 hover:border-gray-500 visited:border-gray-500 transition ease-in-out' />
                    </div>
                </div>
                <div className='mt-10 w-full px-20 mx-auto flex'>
                    <div className='flex justify-start flex-col w-[25%] mr-10'>
                        <h2 className='flex justify-start text-lg font-semibold border-gray-300 hover:border-gray-500 visited:border-gray-500 transition ease-in-out'>Beds</h2>
                        <input
                            type="number"
                            min="1"
                            max="50"
                            name="beds"
                            value={beds}
                            onChange={handleChange}
                            className='rounded border-gray-300 hover:border-gray-600 visited:border-gray-600'
                        />
                    </div>
                    <div className='flex justify-start flex-col w-[25%]'>
                        <h2 className='flex justify-start text-lg font-semibold border-gray-300 hover:border-gray-500 transition ease-in-out'>Baths</h2>
                        <input
                            type="number"
                            min="1"
                            max="50"
                            name="baths"
                            value={baths}
                            onChange={handleChange}
                            className='rounded border-gray-300 hover:border-gray-600 visited:border-gray-600'
                        />
                    </div>
                </div>
                <div className='mt-10 w-full px-20 mx-auto'>
                    <h2 className='flex justify-start text-lg font-semibold'>Parking Spot</h2>
                    <div className='flex justify-start text-semibold uppercase '>
                        <button type="button" name="parking" value={true}
                            onClick={handleChange}
                            className={`bg-white w-[45%] py-3  rounded mr-[5%] shadow-lg font-semibold uppercase hover:shadow-2xl ${parking ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`}>
                            yes
                        </button>
                        <button type="button" name="parking" value={false}
                            onClick={handleChange}
                            className={`w-[45%] py-3  rounded shadow-lg font-semibold uppercase hover:shadow-2xl ${parking ? "bg-white text-gray-700" : "bg-gray-700 text-white"}`}>
                            no
                        </button>
                    </div>
                </div>
                <div className='mt-10 w-full px-20 mx-auto'>
                    <h2 className='flex justify-start text-lg font-semibold'>Furnished</h2>
                    <div className='flex justify-start text-semibold uppercase '>
                        <button type="button"
                            name='furnished'
                            value={true}
                            onClick={handleChange}
                            className={`bg-white w-[45%] py-3  rounded mr-[5%] shadow-lg font-semibold uppercase ${furnished ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`}>
                            yes
                        </button>
                        <button type="button"
                            name='furnished'
                            value={false}
                            onClick={handleChange}
                            className={`w-[45%] py-3  rounded shadow-lg font-semibold uppercase ${furnished ? "bg-white text-gray-700" : "bg-gray-700 text-white"}`}>
                            no
                        </button>
                    </div>
                </div>
                <div className='mt-10 w-full px-20 mx-auto'>
                    <h2 className='flex justify-start text-lg font-semibold'>Address</h2>
                    <div className='flex justify-start font-semibold uppercase '>
                        <textarea
                            placeholder='Address' name='address'
                            value={address}
                            onChange={handleChange}
                            className='w-[95%] p-3 rounded border border-gray-300 hover:border-gray-500 visited:border-gray-500 transition ease-in-out' />
                    </div>
                </div>
                {!geoLocationEnabled &&
                    <div className='mt-10 w-full px-20 mx-auto'>
                        <div className='flex w-[95%] justify-between'>
                            <div>
                                <h2 className='flex justify-start text-lg font-semibold '>Latitude</h2>
                                <input
                                    type="number"
                                    value={latitude}
                                    name="latitude"
                                    onChange={handleChange}
                                    required
                                    className='flex justify-start rounded p-2 border-gray-300 hover:border-gray-600 active:border-gray-600'
                                />
                            </div>
                            <div className='justify-end'>
                                <h2 className='flex justify-start text-lg font-semibold'>Longitude</h2>
                                <input
                                    type="number"
                                    value={longitude}
                                    name="longitude"
                                    onChange={handleChange}
                                    required
                                    className='flex justify-start rounded p-2 border-gray-300 hover:border-gray-600 active:border-gray-600'
                                />
                            </div>
                        </div>
                    </div>
                }

                <div className='mt-10 w-full px-20 mx-auto'>
                    <h2 className='flex justify-start text-lg font-semibold'>Offer</h2>
                    <div className='flex justify-start text-semibold uppercase '>
                        <button type="button"
                            name='offer'
                            value={true}
                            onClick={handleChange}
                            className={` w-[45%] py-3  rounded mr-[5%] shadow-lg font-semibold uppercase ${offer ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`}>
                            yes
                        </button>
                        <button type="button"
                            name='offer'
                            value={false}
                            onClick={handleChange}
                            className={`w-[45%] py-3  rounded shadow-lg font-semibold uppercase ${offer ? "bg-white text-gray-700" : "bg-gray-700 text-white"}`}>
                            no
                        </button>
                    </div>
                </div>

                {type === "rent" ? <><div className='mt-10 w-full px-20 mx-auto flex flex-col'>
                    <h2 className='flex justify-start text-lg font-semibold'>Regular Price</h2>
                    <div className='flex justify-start items-center'>
                        <input type="number" name='regularPrice'
                            value={regularPrice}
                            onChange={handleChange}
                            className='w-[40%] rounded border-gray-300 hover:border-gray-500' />
                        <h4 className='font-semibold ml-3'>$ / Month</h4>
                    </div>
                </div>
                    <div className='mt-10 w-full px-20 mx-auto flex flex-col'>
                        <h2 className='flex justify-start text-lg font-semibold'>Discounted Price</h2>
                        <div className='flex justify-start items-center'>
                            <input type="number" name='discountedPrice'
                                value={discountedPrice}
                                onChange={handleChange}
                                className='w-[40%] rounded border-gray-300 hover:border-gray-500' />
                            <h4 className='font-semibold ml-3'>$ / Month</h4>
                        </div>
                    </div>
                </> :
                    <div className='mt-10 w-full px-20 mx-auto flex flex-col'>
                        <h2 className='flex justify-start text-lg font-semibold'>Price</h2>
                        <input type="number" name='price'
                            value={price}
                            onChange={handleChange}
                            className='w-[40%] rounded border-gray-300 hover:border-gray-500' />
                    </div>
                }
                <div className='mt-10 w-full px-20  flex flex-col justify-start'>
                    <h2 className='flex justify-start text-lg font-semibold'>Regular Price</h2>
                    <h5 className='flex justify-start text-sm '>The first image will be the cover(max 6)</h5>
                    <div className='flex justify-start border border-gray-300 p-2 rounded bg-white'>
                        <input type="file"
                            accept='.jpg,.jpeg,.png'
                            onChange={handleChange}
                            multiple
                            required

                        />
                    </div>
                </div>
                <div className='mt-10 w-full mx-auto flex flex-col justify-start'>
                    <button className='bg-blue-600 rounded uppercase  mx-20 p-2 text-white mb-10 hover:bg-blue-800 transition ease-in-out duration-150' type='submit'
                        onClick={handleSubmit}
                    >
                        create listing
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreateListings
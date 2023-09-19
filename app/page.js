'use client'

import Image from 'next/image'
import { useAuth } from '@/firebase/auth'
import { useRouter } from 'next/navigation'
import Loader from './components/Loader'
import { useEffect, useState } from 'react';
import { collection,addDoc,getDoc,where, query,doc } from 'firebase/firestore'
import { db, storage } from '@/firebase/firebase'
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

export default function Home() {
 const [image, setImage] = useState("");
 const [imgUrl, setImgUrl] = useState([]);
 const {authUser, isLoading, signOut} = useAuth();
 const [progresspercent, setProgresspercent] = useState(0);
 const router = useRouter();

 const handleUpload = (e) => {
  e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }

 useEffect(() => {
if(!isLoading && !authUser) {
  router.push("/login")
}
 }, [authUser, isLoading])
  return !authUser ? (<Loader/>) : (
    <main className="bg-gray-100 mx-2 md:mx-24 rounded-lg px-2 py-6 md:p-10 mb-10">
      <button onClick={signOut} className='text-white tracking-tighter bg-blue-700 border rounded px-2 h-[40px]'>logout</button>
      <div className='flex gap-x-24'>
        <div className='flex justify-center items-baseline gap-x-2'>
        <input type="text" className="w-[16rem] md:w-[350px] px-4 py-3 bg-gray-100 mt-2 border border-zinc-900 focus:border-zinc-600 focus:bg-white focus:outline-none" placeholder='search for image'/>
      <button className="w-[6rem] py-2 border border-blue-700 tracking-tighter text-blue-700">find image</button>
        </div>
      </div>
     <form className="my-10 flex gap-4 items-baseline"  onSubmit={handleUpload}>
      <input type="file"  className="w-[16rem] md:w-[350px] px-4 py-3 bg-gray-100 mt-2 border border-zinc-900 focus:border-zinc-600 focus:bg-white focus:outline-none"/>
      <button className="w-[6rem] border border-blue-700 tracking-tighter text-blue-700 py-2">upload</button>
     </form>
     <div className='max-w-2zl mx-auto py-10 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
<div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols xl:grid-cols-4 xl:gap-x-8'>
{
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      }
</div>
     </div>
    </main>
  )
}

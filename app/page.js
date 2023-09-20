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
    <main className="bg-gray-200 rounded-lg mx-4 px-6 py-6 max-w-2xl md:mx-auto">
     <form className=""  onSubmit={handleUpload}>
      <div className="flex justify-between items-center">
      <button onClick={signOut} className='text-white tracking-tighter bg-blue-700 border rounded px-3 h-[40px]'>logout</button>
      <label className='cursor-pointer text-blue-700 tracking-tighter border border-blue-700 rounded p-2 h-[40px] hover:bg-blue-700 hover:text-white' htmlFor='upload'>upload</label>
      <input type="file" id="upload" className="hidden"/>
      </div>
     </form>

     <div></div>
    </main>
  )
}
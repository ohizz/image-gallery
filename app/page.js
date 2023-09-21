'use client'

import Image from 'next/image'
import { useAuth } from '@/firebase/auth'
import { useRouter } from 'next/navigation'
import Loader from './components/Loader'
import { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/firebase/firebase'

export default function Home() {
 
 const {authUser, isLoading, signOut} = useAuth();
(0);
 const router = useRouter();
 const [isImg, isSetImg] = useState(true);
 const [imageUrl, setImageUrl] = useState([]);
 const [imgUrl, setImgUrl] = useState(null);
 const [reload, setReload] = useState(false);
 const [progresspercent, setProgresspercent] = useState(0);
 
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
      setReload(true);
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
const overviewRef = ref(storage,'files/');
listAll(overviewRef).then((res) => {
  let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
  Promise.all(promises).then((urls) => {
    setImageUrl(urls)
    console.log(imageUrl)
    setReload(true)
  })
})
.catch((err) => {
  console.log(err)
},[])

},[!reload])
 useEffect(() => {
if(!isLoading && !authUser) {
  router.push("/login")
}
 }, [authUser, isLoading])
  return !authUser ? (<Loader/>) : (
    <main className='mb-8'>
    <div className="bg-gray-200 rounded-lg mx-4 px-6 py-6 max-w-2xl md:mx-auto">
    <button onClick={signOut} className='mb-6 text-white tracking-tighter bg-blue-700 border rounded px-3 h-[40px]'>logout</button>
     <form onSubmit={handleUpload}>
      <div className="flex justify-between items-center">
      {/* <label className='cursor-pointer text-blue-700 tracking-tighter border border-blue-700 rounded p-2 h-[40px] hover:bg-blue-700 hover:text-white' htmlFor='upload'>upload</label> */}
      <input type="file" className=""/>
      <button className='text-white tracking-tighter bg-blue-700 border rounded px-3 h-[40px]' type='submit'>upload</button>
      </div>
     </form>
     {/* <form onSubmit={handleUpload} className='form'>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form> */}

    </div>
    <div className='mt-10 grid gap-y-6 gap-x-4 grid-cols-2 sm:grid-cols-3 md:gap-x-8 mx-4'>
       {imageUrl.map((url, id) => (
          <Image key={id} src={url} width={300} height={200}  className={`${isImg ? "grayscale blur-sm scale-110" : 'grayscale-0 blur-0 scale-100 rounded-md'} 'w-full h-32 md:h-[280px] object-cover rounded'`} onLoadingComplete={() => isSetImg(false)}/>
))}
     </div>
    </main>
  )
}
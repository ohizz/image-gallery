'use client'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import Axios from 'axios'
import Image from 'next/image'
import { useAuth } from '@/firebase/auth'
import { useRouter } from 'next/navigation'
import Loader from './components/Loader'
import { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '@/firebase/firebase'

export default function Home() {
 
 const {authUser, isLoading, signOut} = useAuth();
(0);
 const router = useRouter();
 const [isImg, isSetImg] = useState(true);
 const [imageUrl, setImageUrl] = useState([]);
 const [imgUrl, setImgUrl] = useState(null);
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
  })
})
.catch((err) => {
  console.log(err)
},[])

},[])
 useEffect(() => {
if(!isLoading && !authUser) {
  router.push("/login")
}
 }, [authUser, isLoading])
  return !authUser ? (<Loader/>) : (
    <main className='mb-8'>
    <div className="bg-gray-200 rounded-lg mx-4 px-6 py-6 max-w-2xl md:mx-auto">
     <form className=""  onSubmit={handleUpload}>
      <div className="flex justify-between items-center">
      <button onClick={signOut} className='text-white tracking-tighter bg-blue-700 border rounded px-3 h-[40px]'>logout</button>
      <label className='cursor-pointer text-blue-700 tracking-tighter border border-blue-700 rounded p-2 h-[40px] hover:bg-blue-700 hover:text-white' htmlFor='upload'>upload</label>
      <input type="file" accept="image/*" id="upload" className="hidden"/>
      </div>
     </form>

    </div>
    <div className='mt-10 grid gap-y-10 gap-y-10 gap-x-6 grid-cols-2 sm:grid-cols-3 md:gap-x-8 mx-4'>
       {imageUrl.map((url, id) => (
          <Image key={id} src={url} width={200} height={200}  className={`${isImg ? "grayscale blur-2xl scale-110" : 'grayscale-0 blur-0 scale-100'} 'rounded-sm w-full h-full cover'`} onLoadingComplete={() => isSetImg(false)}/>
))}
     </div>
    </main>
  )
}
'use client';
import Link from "next/link";
import { auth } from "@/firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useAuth } from "@/firebase/auth";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
const page = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
 const {authUser, isLoading} = useAuth();
const router = useRouter();
 useEffect(()=>{
 if(!isLoading && authUser){
 router.push("/")
 }
 }, [authUser, isLoading])
const loginHandler = async() => {
 if(!email || !password) return;
 try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    console.log(user)
} catch(error) {
 console.error('error occur', error)
}
}
 return isLoading|| (!isLoading && authUser) ? (<Loader/>) :
 (

    <div className="bg-gray-100 max-w-md mx-auto rounded-lg py-10">
    <form className="flex gap-y-6 items-center flex-col" onSubmit={(e) => e.preventDefault()}>
    <div className="flex flex-col w-[75%]">
        {/* <h1 className="font-black text-4xl tracking-tighter">Login Form</h1> */}
        <div className="flex items-center justify-center gap-x-2">
        <p className="tracking-tighter">Login to explore our image Gallery or sign up if you dont have an account</p>
        <Link href="/register" className=" p-2 h-[40px] bg-blue-700 text-white text-center rounded ">register</Link>
        </div>
        </div>
        <div className="mt-2">
            <label className="block text-gray-700">email</label>
            <input className="w-[16rem] md:w-[350px] px-4 py-3 bg-gray-100 mt-2 border border-zinc-900 focus:border-zinc-600 focus:bg-white focus:outline-none" placeholder="enter email" autofocus autocomplete type="email" required onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="">
            <label className="block text-gray-700">password</label>
            <input className="w-[16rem] md:w-[350px] px-4 py-3 bg-gray-100 mt-2 border border-zinc-900 focus:border-zinc-600 focus:bg-white focus:outline-none" autofocus autocomplete type="password" placeholder="enter password" required onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="flex justify-center gap-x-2 items-center">
        <button className="w-[16rem] md:w-[350px] bg-blue-700 tracking-tighter text-white py-3 rounded" type="submit" onClick={loginHandler}>login</button>
        </div>
    </form>
    </div>
 )
}

export default page
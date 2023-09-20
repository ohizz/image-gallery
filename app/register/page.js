'use client'
import { useEffect, useState } from "react"
import { auth } from "@/firebase/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useAuth } from "@/firebase/auth"
import { useRouter } from "next/navigation"
import Loader from "../components/Loader"
import Link from "next/link"
const Page = () => {
const [username, setUsername] = useState(null)
const [email, setEmail] = useState(null)
const [password, setPassword] = useState(null)
const {authUser, isLoading, setAuthUser} = useAuth();
const router = useRouter();

useEffect(() => {
   if (!isLoading && authUser) {
       router.push("/");
   }
}, [authUser, isLoading]);
const signupHandler = async () => {
   if (!email || !username || !password) return;
   try {
       const { user } = await createUserWithEmailAndPassword(
           auth,
           email,
           password
       );
       await updateProfile(auth.currentUser, {
           displayName: username,
       });
       setAuthUser({
           uid: user.uid,
           email: user.email,
           username,
       });

       console.log(user);
   } catch (error) {
       console.error("An error occured", error);
   }
};
return isLoading || (!isLoading && authUser) ? (
   <Loader />
) : (
   <div className="bg-gray-100 max-w-xl mx-auto rounded-lg px-2 py-6 md:p-10 mb-10">
       <form className="flex gap-y-6 items-center flex-col"  onSubmit={(e) => e.preventDefault()}>
           <div className="flex gap-x-2 justify-center items-center">
            <p>Register to get a free account and explore our image gallery or click on the login button to login if you already have an account</p>
            <Link href="/login" className="h-[40px] bg-blue-700 text-white text-center rounded  p-2">login</Link>
           </div>
           
           <div>
               <label className="block text-gray-700">name</label>
               <input className="w-[16rem] md:w-[350px] px-4 py-3 bg-gray-100 mt-2 border border-zinc-900 focus:border-zinc-600 focus:bg-white focus:outline-none"  type="text" required onChange={(e) => setUsername(e.target.value)}/>
           </div>
           <div>
               <label className="block text-gray-700">email</label>
               <input className="w-[16rem] md:w-[350px] px-4 py-3 bg-gray-100 mt-2 border border-zinc-900 focus:border-zinc-600 focus:bg-white focus:outline-none"   type="email" required onChange={(e) => setEmail(e.target.value)}/>
           </div>
           <div>
               <label className="block text-gray-700">password</label>
               <input className="w-[16rem] md:w-[350px] px-4 py-3 bg-gray-100 mt-2 border border-zinc-900 focus:border-zinc-600 focus:bg-white focus:outline-none" type="password" placeholder="enter password" required onChange={(e) => setPassword(e.target.value)}/>
           </div>
           <div className="flex justify-center gap-x-2 items-center">
        <button className="w-[16rem] md:w-[350px] bg-blue-700 tracking-tighter text-white py-3 rounded" type="submit" onClick={signupHandler}>signup</button>
        </div>
       </form>
       </div>
    )
   }

export default Page;
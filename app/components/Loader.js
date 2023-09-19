const { default: Image } = require("next/image");
import { Montserrat } from "next/font/google";

const mon = Montserrat({
 weight: '800',
 subsets: ['latin']
})

const Loader = () => {
 return(
    <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <svg className="animate-spin h-5 w-5 mr-3 bg-zinc-900 text-black" viewBox="0 0 24 24">
  </svg>
    <h1 className={`${mon.className} text-5xl -tracking-[4px]`}>Loading...</h1>
    </div>
 )
}

export default Loader; 
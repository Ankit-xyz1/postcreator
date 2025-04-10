"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {
  //these are state for handling inputs
  const [context, setContext] = useState<string>("");
  const [pass, setpass] = useState<string>("")

  //state for the app
  const [loading, setloading] = useState<boolean>(false)
  const [postData, setpostData] = useState<any[]>([])


  //functions for hadnling input 
  const handleContext = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };
  const Handlepass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpass(e.target.value);
  };

  const GenrateFunction = async () => {

    //if there is no both returns an error
    if (!context || !pass) return toast.error('enter context and password');

    //handling errors
    try {
      //sets loading state to true
      setloading(true)
      //fetching data from api
      const response = await fetch('/api/genratePost',{
        method:"POST",
        body:JSON.stringify({
          password:pass,
          context
        })
      })
      //parsing the data
      const data = await response.json()
      console.log(data)

      //an sucess toast
      toast.error('genrated sucessfully');
      //sets loading state to false
      setloading(false)


    } catch (error) {
      //if any errors set loading state to false first
      console.log(error);
      setloading(false)
      toast.error('some error occured');
    }
    
  }

  return (
    <BackgroundLines className="flex  bg-zinc-950 items-center justify-center h-screen w-full flex-col px-4 p-10">
      <div className="h-screen md:w-[40%] w-full bg-zinc-900 p-5 rounded-3xl relative z-[9999999999999999] jet">
        <Toaster />
        <div className="context  flex flex-col gap-4">
          <textarea
            rows={5}
            className="text-white bg-zinc-800 p-4 rounded-xl focus:outline-none resize-none md:text-lg"
            placeholder="Give me some context"
            value={context}
            onChange={handleContext}
          />
          <div className="flex items-center h-fit w-full p-3 gap-5">
            <input
              type="password"
              className="p-3 rounded-xl bg-zinc-800 text-white focus:outline-none w-[50%] md:w-[286px]"
              placeholder="enter the pass-key to use"
              value={pass}
              onChange={Handlepass}
            />
            <button
              className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-zinc-900/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-zinc-500/50 border border-zinc-600/20 cursor-pointer"
              onClick={GenrateFunction}
            >
              <span className="text-lg">Create Post</span>
              <div
                className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
              >
                <div className="relative h-full w-10 bg-white/30"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
}

"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { CheckCheck, Copy, Loader, SquareArrowOutUpRight } from 'lucide-react'


export default function Home() {
  //these are state for handling inputs
  const [context, setContext] = useState<string>("");
  const [pass, setpass] = useState<string>("")

  //state for the app
  const [copy, setcopy] = useState(false)
  const [loading, setloading] = useState<boolean>(false)
  const [postData, setpostData] = useState<any[]>([])

  const [LinkedInpost, setLinkedInpost] = useState<string>("")
  const [xPost, setxPost] = useState<string>("")

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
      const response = await fetch('/api/genratePost', {
        method: "POST",
        body: JSON.stringify({
          password: pass,
          context
        })
      })
      //parsing the data
      const data = await response.json()
      console.log(data)

      if (!data.sucess) {
        setContext("");
        setpass("");
        return toast.error(data.message);
      }


      if (data.sucess) {
        // updating post state
        setxPost(data.x);
        setLinkedInpost(data.linkedIn);
        //an sucess toast
        toast.success('genrated sucessfully');
        //sets loading state to false
        setContext("");
        setloading(false)
      }


    } catch (error) {
      //if any errors set loading state to false first
      console.log(error);
      setloading(false)
      toast.error('some error occured');
    }

  }

  //copying an post 
  const copyText = async (data: string) => {
    setcopy(true)
    await navigator.clipboard.writeText(data)
    toast.success("copied sucessfully")
    setTimeout(() => {
      setcopy(false)
    }, 1000);
  }

  const post = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(xPost)}`);
  }
  return (
    <BackgroundLines className="flex  bg-zinc-950 items-center justify-center h-screen w-full flex-col px-4 p-10">
      <div className="h-screen md:w-[60%] w-full bg-zinc-900 p-5 rounded-3xl relative z-[9999999999999999] jet">
        <Toaster />
        <div className="context h-fit flex flex-col gap-4">
          <textarea
            rows={5}
            className="text-white bg-zinc-800 p-4 rounded-xl focus:outline-none resize-none md:text-sm"
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
        <div className=" h-[50vh] w-full flex gap-2 flex-wrap justify-center overflow-auto p-5  text-[9px] md:text-xs">
          {loading ?<div className="h-full w-full flex items-center justify-center"> <Loader className="animate-spin text-white" size={25} /> </div>: <>

            {xPost &&
              <div className="card min-h-fit w-[500px] text-white bg-zinc-800 p-3 relative rounded text-[9px] md:text-xs" >
                <h1 className="text-xl mb-4 text-purple-400">X Post</h1>
                <ReactMarkdown>
                  {xPost}
                </ReactMarkdown>
                <div className="copy post absolute top-2 right-2 w-fit flex gap-1">
                  <button className="relative group cursor-pointer bg-zinc-950 hover:bg-zinc-700 p-2 rounded h-fit transition-all ease-in-out duration-200" onClick={post}>
                    <SquareArrowOutUpRight size={12} />
                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded z-10">
                      Post on X
                    </span>
                  </button>
                  <button className="relative group cursor-pointer bg-zinc-950 hover:bg-zinc-700 p-2 rounded h-fit transition-all ease-in-out duration-200" onClick={() => copyText(LinkedInpost)}>
                    {copy ? <CheckCheck size={12} /> : <Copy size={12} />}
                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded z-10">
                      Copy
                    </span>
                  </button>
                </div>
              </div>
            }
            {LinkedInpost &&
              <div className="card min-h-fit w-[500px] text-white bg-zinc-800 p-3 relative rounded" >
                <h1 className="text-xl mb-4 text-purple-400">LinkedIn Post</h1>
                <ReactMarkdown>
                  {LinkedInpost}
                </ReactMarkdown>
                <div className="copy post absolute top-2 right-2 w-fit flex gap-1">
                  <button className="relative group cursor-pointer bg-zinc-950 hover:bg-zinc-700 p-2 rounded h-fit transition-all ease-in-out duration-200" onClick={() => copyText(LinkedInpost)}>
                    {copy ? <CheckCheck size={12} /> : <Copy size={12} />}
                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded z-10">
                      Copy
                    </span>
                  </button>
                </div>
              </div>
            }
          </>
          }
        </div>
      </div>
    </BackgroundLines>
  );
}

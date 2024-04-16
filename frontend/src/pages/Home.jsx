import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate()

  const checkUserAuth = async() =>{
    if (token) {
      await axios.get("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/user/loggeduserdata", {headers: {"Authorization": `Bearer ${token}`}})
      .then((res)=>{
        if (res.data.user) {
          navigate("/app")
        }else{
          localStorage.removeItem("authToken")
        }
      })
    }
  }

  checkUserAuth()

  return (
    <section className="w-full h-screen relative flex bg-[url('https://i.postimg.cc/C1RsTxnL/high-angle-hand-holding-notebook.jpg')] bg-cover">
        <div className='flex-1 w-full flex items-center justify-center px-5'>
            <div className='text-center'>
                <h1 className='head-text blue-gradient_text'>Free Browser Based Note Taking</h1>
                <div className='3t-5 flex flex-col gap-3 text-blue-400 text-xl'>
                    <p>Effortless note taking made simple. Capture, organize and access your ideas seamlessly with our powerful web app</p>
                </div>

                
                <button className=' btn my-10 '>Sign Up for Free</button>
                <p className='text-9xl mt-10 blue-gradient_text font-bold'>Note ü</p>
            </div>
            
        </div>
    </section>
  )
}

export default Home
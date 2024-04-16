import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sendEmail, setSendEmail] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("authToken");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState({show:false, message:""});

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

  const handleChange = (e) =>{
    setEmail(e.target.value)
    console.log(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const location = window.location.href.split('forgetpassword')
    const restUrl = location[0] + "resetpassword"
    try {

      await axios.post("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/user/send-password-reset-email", {
        email: email,
        page: restUrl
      },
        { headers: { "Authorization": `Bearer ${token}` } }
      )
        .then((res) => {
          if (res.data.status === "success") {
            setSendEmail(true)
            setIsLoading(false)
            setIsSuccess(true)
            setShowAlert({show:true, message:res.data.message});
            setTimeout(() => {
                setEmail('')
                setShowAlert(false);
              }, [3000]);
          } else {
            setIsSuccess(false)
            setShowAlert({show:true, message:res.data.message});
            setIsLoading(false);
            
            setTimeout(() => {
              setShowAlert(false);
            }, [3000]);
            }
        })
    } catch (error) {
      setIsSuccess(false)
            setShowAlert({show:true, message:error.message});
            setIsLoading(false);
            setTimeout(() => {
              setShowAlert(false);
            }, [3000]);
    }

  }


  return (
    <>
    { showAlert.show ? <div className='top-20 w-full h-full fixed flex justify-center items-start z-10'>
            <motion.div initial={{y: -500}} animate={{y:0}} transition={{duration:"0.5"}} className={`h-[60px] ${isSuccess ? 'bg-green-500':'bg-red-600'} text-white font-semibold font-poppins text-xl flex items-center justify-center p-5 rounded-lg`}>
                { isSuccess ? `${showAlert.message} 😄` : `${showAlert.message} 😟`}
            </motion.div>
        </div>:null
    }
    <section className='relative flex lg:flex-row flex-col max-container'>
      
        <div className='flex-1 min-w-[50%] flex flex-col'>
          <h1 className='head-text blue-gradient_text'>Forget Password?</h1>   

          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-7 mt-8'>

            <label className="text-white/40 font-semibold">
              email
              <input type="email" name='email' className='input' placeholder='John@email.com' required value={email} onChange={handleChange}/>
            </label>

            {sendEmail ? 
                <div className=' flex justify-center items-center text-slate-400'>
                    <div className='text-center'>
                        <p>Please check your email</p>
                        <div className='mt-5'>
                        <p className='mb-5'>Resend Email in</p>

                            <div className='flex items-center justify-center text-blue-400 text-xl'>
                            <CountdownCircleTimer 
                            size={115}
                            isPlaying
                            duration={60}
                            colors={['#00c6ff', "#0072ff"]}
                            colorsTime={[60, 30]}
                            onComplete={()=>{
                                setSendEmail(false)
                            }}
                            >
                                {({ remainingTime })=> remainingTime}
                            </CountdownCircleTimer>
                            </div>
                        </div>
                    </div>

                </div>
                :
                <>
                    <button type='submit' disabled={isLoading} className="btn">{isLoading ? 'Sending.. Please wait' : 'Send Email' }</button>
                </>
            }
          </form>
        </div>

        <div className='flex-1 min-w-[50%] flex flex-col'>
          <div className='lg:mx-10 lg:border border-blue-400 subhead-text rounded-lg w-full h-full my-[100px] text-blue-400 items-center justify-center flex text-center'>
            <div>
              <p className='lg:mx-5 sm:mx-0'> Or</p>

              <div className='grid'>
                <button className='btn mt-10'>Sign Up Here</button>
                <button className='btn mt-10'>Sign In Here</button>
              </div>
              
            </div>
          </div>
        </div>
    </section>
    </>
  )
}

export default ForgetPassword
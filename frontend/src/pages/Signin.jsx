import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Signin = () => {
  const [form, setForm] = useState({ email:'', password:''})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState({show:false, message:""});

  const token = localStorage.getItem("authToken");


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

  const handleChange = ( {target: {name, value}}) =>{
    setForm({...form, [name]:value})
  }

  const handleSignIn = async(e) =>{
    e.preventDefault()
    setIsLoading(true)
    const data = {Objects: [form.email, form.password]}
    await axios.post("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/user/login",{
      email: form.email,
      password: form.password
    }).then((res)=>{
      if (res.data.status === "success") {
        navigate("/app")
        setIsSuccess(true)
        localStorage.setItem("authToken", res.data.token)
        setIsLoading(false)
        setShowAlert({show:true, message:res.data.message});
        setTimeout(() => {
            setForm({email:'', password:''})
            setShowAlert(false);
          }, [3000]);
      } else {
          setShowAlert({show:true, message:res.data.message});
          setIsLoading(false);
          setTimeout(() => {
            setShowAlert(false);
          }, [3000]);
        }
    })
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
          <h1 className='head-text blue-gradient_text'>Sign In</h1>   

          <form onSubmit={handleSignIn} className='w-full flex flex-col gap-7 mt-8'>

            <label className="text-white/40 font-semibold">
              email
              <input type="email" name='email' className='input' placeholder='John@email.com' required value={form.email} onChange={handleChange}/>
            </label>

            <label className="text-white/40 font-semibold">
              password
              <input type="password" name='password' className='input' required value={form.password} onChange={handleChange}/>
            </label>

            <p className='text-white text-right'>Forget Password? <Link to="/forgetpassword" className='text-blue-400'>Reset Here</Link></p>
            <button type='submit' disabled={isLoading} className="btn">{isLoading ? 'Sign In.. Please wait' : 'Sign In' }</button>
          </form>
        </div>

        <div className='flex-1 min-w-[50%] flex flex-col'>
          <div className='lg:mx-10 lg:border border-blue-400 subhead-text rounded-lg w-full h-full my-[100px] text-blue-400 items-center justify-center flex text-center'>
            <div>
              <p className='lg:mx-5 sm:mx-0'> Do you haven't an account?</p>
              <button className='btn mt-10'>Sign Up Here</button>
            </div>
          </div>
        </div>
    </section>
    </>
  )
}

export default Signin
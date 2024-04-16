import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PasswordChecklist from "react-password-checklist"

const Resetpassword = () => {
  const [form, setForm] = useState({ password:'', confirm_password:''})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("authToken");
  const {id, resttoken} = useParams()
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState({show:false, message:""});
  const [validPassword, setValidPassword] = useState(false);


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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validPassword) {
      setIsSuccess(false)
      setShowAlert({show:true, message:"Please enter valid details"})
        setTimeout(() => {
            setShowAlert(false)
          }, [3000]);
      return
    }

    setIsLoading(true)

    try {

      await axios.post(`http://127.0.0.1:5001/notetakingapi/us-central1/app/api/user//resetpassword/${id}/${resttoken}`, {
        password: form.password,
        confirm_password: form.confirm_password
      })
        .then((res) => {
          console.log(res)
          if (res.data.status === "success") {
            setIsLoading(false)
            navigate("/Signin")

            setIsSuccess(true)
        setShowAlert({show:true, message:res.data.message});
        setTimeout(() => {
            setForm({password:'', confirm_password:''})
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
      setIsLoading(false)
      setIsSuccess(false)
            setShowAlert({ show: true, message: errormessage });

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
          <h1 className='head-text blue-gradient_text'>Reset Password</h1>   

          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-7 mt-8'>
            <label className="text-white/40 font-semibold">
              New Password
              <input type="password" name='password' className='input' required value={form.name} onChange={handleChange}/>
            </label>

            <label className="text-white/40 font-semibold">
              Confirm password
              <input type="password" name='confirm_password' className='input' required value={form.email} onChange={handleChange}/>
            </label>

            <button type='submit' disabled={isLoading} className="btn">{isLoading ? 'Please wait..' : 'Reset Password' }</button>
          </form>
        </div>

        <div className='flex-1 min-w-[50%] flex flex-col'>
          <div className='lg:mx-10 lg:border border-blue-400 rounded-lg w-full h-full my-[100px] text-blue-400 items-center justify-center flex text-center'>
            <div>
            <PasswordChecklist
              rules={["minLength","specialChar","number","capital","match"]}
              minLength={5}
              value={form.password}
              valueAgain={form.confirm_password}
              className='text-left grid justify-center text-lg mb-5'
              messages={{
                minLength: "Password has more than 8 characters",
                specialChar: "Password has special characters",
                number: "Password has a number",
                capital: "Password has a Capital letter",
                match: "Password Match",
              }}
              onChange={(isValid) => {
                if (isValid) {
                  setValidPassword(true)
                }
              }}
            />
            </div>
          </div>
        </div>
    </section>
    </>
  )
}

export default Resetpassword
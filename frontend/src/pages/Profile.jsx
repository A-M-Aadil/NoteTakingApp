import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PasswordChecklist from "react-password-checklist"
import { VscAccount } from "react-icons/vsc";

const Profile = () => {
    const [form, setForm] = useState({ password: '', confirm_password: '' })
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState({show:false, message:""});
    const [validPassword, setValidPassword] = useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken");

    const checkUserAuth = async() =>{
        if (token) {
        await axios.get("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/user/loggeduserdata", {headers: {"Authorization": `Bearer ${token}`}})
        .then((res)=>{
            if (!res.data.user) {
            localStorage.removeItem("authToken")
            navigate("/signin")
            }else{
                setUser(res.data.user)
            }
        })
        }
    }


    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }

    const handleChangePassword = async(e)=>{
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
          
            await axios.post("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/user/changepassword", {
              password: form.password,
              confirm_password: form.confirm_password,
            },
            {headers: {"Authorization": `Bearer ${token}`}}
            )
              .then((res) => {
                console.log(res)
                if (res.data.status === "success") {
                    localStorage.removeItem("authToken")
                    setIsLoading(false)
                    navigate("/signin")
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

    useEffect(() => {
        checkUserAuth()
    }, [])
    
    return (
        <>
        { showAlert.show ? <div className='top-20 w-full h-full fixed flex justify-center items-start z-10'>
            <motion.div initial={{y: -500}} animate={{y:0}} transition={{duration:"0.5"}} className={`h-[60px] ${isSuccess ? 'bg-green-500':'bg-red-600'} text-white font-semibold font-poppins text-xl flex items-center justify-center p-5 rounded-lg`}>
                { isSuccess ? `${showAlert.message} 😄` : `${showAlert.message} 😟`}
            </motion.div>
            </div>:null
          }
        <section className='relative flex lg:flex-row flex-col max-container'>
            <div className='w-full grid'>

                <div className='w-full h-24 bg-black-500 flex items-center'>
                    <div className='flex justify-start items-center m-5 w-full'>
                        <div className='btn-back mx-5 cursor-pointer font-bold text-lg' onClick={()=>{navigate(-1)}}>←</div>
                    </div>
                </div>

                <div className='flex justify-center w-full'>
                    <div className='mt-14 text-center w-full'>
                        <div className='flex items-center justify-center'>
                            <div className='w-20 h-20 bg-blue-400 rounded-full'>
                                <VscAccount className='w-full h-full text-white ' />
                            </div>
                        </div>

                        <div className='subhead-text text-blue-500 mt-5'>
                            <p>{user.name}</p>
                        </div>

                        <div className='text-xlg font-semibold text-slate-500 mt-2'>
                            <p>{user.email}</p>
                        </div>

                        {changePassword ?
                            <>
                                <div className='flex justify-end'>
                                    <p className='mr-5 mt-5 text-xl text-slate-300 font-bold cursor-pointer' onClick={()=>{setChangePassword(false)}}>X</p>
                                </div>
                                <form onSubmit={handleChangePassword} className='w-full flex flex-col gap-7 mt-8'>
                                    <label className="text-white/40 font-semibold text-left">
                                        New Password
                                        <input type="password" name='password' className='input' required value={form.password} onChange={handleChange} />
                                    </label>

                                    <label className="text-white/40 font-semibold text-left">
                                        Confirm password
                                        <input type="password" name='confirm_password' className='input' required value={form.confirm_password} onChange={handleChange} />
                                    </label>

                                    <button type='submit' disabled={isLoading} className="btn">{isLoading ? 'Please wait..' : 'Reset Password'}</button>
                                </form>
                                <div className='mt-10 text-slate-500'>
                                    <PasswordChecklist
                                        rules={["minLength","specialChar","number","capital","match"]}
                                        minLength={5}
                                        value={form.password}
                                        valueAgain={form.confirm_password}
                                        className='text-left grid justify-center text-lg my-10'
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
                            </>
                            :
                            <div className='flex items-center justify-center mt-5'>
                                <button className='btn' onClick={()=>{setChangePassword(true)}}>Change Password</button>
                            </div>
                        }

                    </div>
                </div>



            </div>
        </section>
        </>
    )
}

export default Profile
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
    const [userloggedin, setUserloggedin] = useState(false)


  const checkUserAuth = async(token) =>{
    if (token) {
      await axios.get("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/user/loggeduserdata", {headers: {"Authorization": `Bearer ${token}`}})
      .then((res)=>{
        if (res.data.user) {
          setUserloggedin(true)
        }else{
          setUserloggedin(false)
        }
      })
    }
  }

  

  const handleLogout = () =>{
    localStorage.removeItem("authToken")
    setUserloggedin(false)
  }

  useEffect(() => {
    checkUserAuth(localStorage.getItem("authToken"))

  }, [])
  
  
  return (
    <header className='header'>
        <NavLink to="/" className="w-20 h-10  items-center justify-center flex font-bold shadow-md">
        <p className='blue-gradient_text'>Note ü</p>
        </NavLink>

        <nav className='flex text-lg gap-7 font-medium'>
            <NavLink to="/about" className={({ isActive })=> isActive ? 'text-blue-500' : 'text-white'}>
                About
            </NavLink>
            <NavLink to="/contact" className={({ isActive })=> isActive ? 'text-blue-500' : 'text-white'}>
                Contact
            </NavLink>
            { userloggedin ? 
            <>
              <NavLink to="/" className='text-[#b90000]' onClick={handleLogout}>
                Logout
              </NavLink>
            </>
            :
            <>
            <NavLink to="/Signin" className={({ isActive })=> isActive ? 'text-blue-500' : 'text-white'}>
                Sign In
            </NavLink>
            <NavLink to="/signup" className={({ isActive })=> isActive ? 'text-blue-500' : 'text-white'}>
                Sign Up
            </NavLink>
            </>
            }
        </nav>
    </header>
  )
}

export default Navbar
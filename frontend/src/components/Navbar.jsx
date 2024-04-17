import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { MdMenuOpen } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const [userloggedin, setUserloggedin] = useState(false)
    const [menuToggle, setMenuToggle] = useState(false)

  // check user authentication
  const checkUserAuth = async(token) =>{
    // verifiy auth token
    if (token) {
      await axios.get("https://us-central1-notetakingapi.cloudfunctions.net/app/api/user/loggeduserdata", {headers: {"Authorization": `Bearer ${token}`}})
      .then((res)=>{
        if (res.data.user) {
          setUserloggedin(true)
        }else{
          setUserloggedin(false)
        }
      })
    }
  }

  
  // user loggout function
  const handleLogout = () =>{
    localStorage.removeItem("authToken")
    setUserloggedin(false)
    setMenuToggle(false)
  }

  useEffect(() => {
    checkUserAuth(localStorage.getItem("authToken"))

  }, [])
  
  
  return (
    <>
    <header className='header z-20'>
        <NavLink to="/" className="w-20 h-10  items-center justify-center flex font-bold shadow-md">
        <p className='blue-gradient_text'>Note ü</p>
        </NavLink>

        <nav className='md:flex text-lg gap-7 font-medium hidden'>
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

        <nav className='md:hidden'>
        {
          menuToggle ? 
          null
          :
          <MdMenuOpen className='text-2xl text-white cursor-pointer' onClick={()=>setMenuToggle(!menuToggle)}/>
        }
        </nav>
    </header>
    {
      menuToggle ? 
      <>
        <div className='w-full h-full bg-slate-800/90 absolute z-10 '>
          <div className='flex items-start justify-end m-7 h-[20%]'>
            <IoClose className='text-2xl text-white cursor-pointer z-20' onClick={()=>setMenuToggle(!menuToggle)} />
          </div>
          <div className='grid items-center justify-center'>
                <NavLink to="/" className={({ isActive })=> isActive ? 'text-blue-500 m-4' : 'text-white m-4'} onClick={()=>setMenuToggle(false)}>
                  Home
              </NavLink>
            <NavLink to="/about" className={({ isActive })=> isActive ? 'text-blue-500 m-4' : 'text-white m-4'} onClick={()=>setMenuToggle(false)}>
                  About
              </NavLink>
              <NavLink to="/contact" className={({ isActive })=> isActive ? 'text-blue-500 m-4' : 'text-white m-4'} onClick={()=>setMenuToggle(false)}>
                  Contact
              </NavLink>
              { userloggedin ? 
                <>
                  <NavLink to="/" className='text-[#b90000] m-4' onClick={handleLogout} >
                    Logout
                  </NavLink>
                </>
              :
                <>
                  <NavLink to="/Signin" className={({ isActive })=> isActive ? 'text-blue-500 m-4' : 'text-white m-4'} onClick={()=>setMenuToggle(false)}>
                      Sign In
                  </NavLink>
                  <NavLink to="/signup" className={({ isActive })=> isActive ? 'text-blue-500 m-4' : 'text-white m-4'} onClick={()=>setMenuToggle(false)}>
                      Sign Up
                  </NavLink>
                </>
              }
          </div>
        </div>
      </>
      :
      null
    }
    </>
  )
}

export default Navbar
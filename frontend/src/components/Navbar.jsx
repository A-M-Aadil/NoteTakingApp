import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='header'>
        <NavLink to="/" className="w-20 h-10  items-center justify-center flex font-bold shadow-md">
        <p className='blue-gradient_text'>Note ü</p>
        </NavLink>

        <nav className='flex text-lg gap-7 font-medium'>
            <NavLink to="/about" className={({ isActive })=> isActive ? 'text-blue-500' : 'text-white'}>
                About
            </NavLink>
            <NavLink to="/Signin" className={({ isActive })=> isActive ? 'text-blue-500' : 'text-white'}>
                Sign In
            </NavLink>
            <NavLink to="/signup" className={({ isActive })=> isActive ? 'text-blue-500' : 'text-white'}>
                Sign Up
            </NavLink>
        </nav>
    </header>
  )
}

export default Navbar
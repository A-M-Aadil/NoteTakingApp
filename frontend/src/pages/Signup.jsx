import React, { useState } from 'react'

const Signup = () => {
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm_password:''})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = ( {target: {name, value}}) =>{
    setForm({...form, [name]:value})
  }
  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      
        <div className='flex-1 min-w-[50%] flex flex-col'>
          <h1 className='head-text blue-gradient_text'>Sign In</h1>   

          <form onSubmit={""} className='w-full flex flex-col gap-7 mt-8'>
            <label className="text-white/40 font-semibold">
              Name
              <input type="text" name='name' className='input' placeholder='John' required value={form.name} onChange={handleChange}/>
            </label>

            <label className="text-white/40 font-semibold">
              email
              <input type="email" name='email' className='input' placeholder='John@email.com' required value={form.email} onChange={handleChange}/>
            </label>

            <label className="text-white/40 font-semibold">
              password
              <input type="passwoed" name='passwoed' className='input' required value={form.passwoed} onChange={handleChange}/>
            </label>

            <label className="text-white/40 font-semibold">
              Confirm password
              <input type="password" name='confirm_password' className='input' required value={form.confirm_password} onChange={handleChange}/>
            </label>

            <button type='submit' disabled={isLoading} className="btn">{isLoading ? 'Sign Up.. Please wait' : 'Sign Up' }</button>
          </form>
        </div>

        <div className='flex-1 min-w-[50%] flex flex-col'>
          <div className='lg:mx-10 lg:border border-blue-400 subhead-text rounded-lg w-full h-full my-[100px] text-blue-400 items-center justify-center flex text-center'>
            <div>
              <p className='lg:mx-5 sm:mx-0'> Do you have an account?</p>
              <button className='btn mt-10'>Sign In Here</button>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Signup
import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'

const Contact = () => {
  const [form, setForm] = useState({ name:'', email:'', message:''})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsLoading(true);

        emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
              from_name: form.name,
              to_name: "Note U",
              from_email: form.email,
              to_email: 'ratulipra@gmail.com',
              message: form.message
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
          ).then(()=>{
            setIsLoading(false);
            setIsSuccess(true);
            showAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setForm({name:'', email:'', message:''});
            }, [3000]);
      
          }).catch((error)=>{
            setShowAlert(true);
            setIsLoading(false);setTimeout(() => {
                setShowAlert(false);
                console.log(error)
                setForm({name:'', email:'', message:''});
            }, [3000]);
          })
    };

  const handleChange = ( {target: {name, value}}) =>{
    setForm({...form, [name]:value})
  }

  return (
    <>
    { showAlert ? <div className='top-20 w-full h-full fixed flex justify-center items-start z-10'>
            <motion.div initial={{y: -500}} animate={{y:0}} transition={{duration:"0.5"}} className={`h-[60px] ${isSuccess ? 'bg-green-500':'bg-red-600'} text-white font-semibold font-poppins text-xl flex items-center justify-center p-5 rounded-lg`}>
                { isSuccess ? 'Message Sent Successfully 😄' : ' Message Sent Failed 😟'}
            </motion.div>
        </div>:null
    }

    <section className='relative flex lg:flex-row flex-col max-container'>
      
        <div className='flex-1 min-w-[50%] flex flex-col'>
          <h1 className='head-text blue-gradient_text'>Contact</h1>   

          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-7 mt-8'>
            <label className="text-white/40 font-semibold">
              Name
              <input type="text" name='name' className='input' placeholder='John' required value={form.name} onChange={handleChange}/>
            </label>

            <label className="text-white/40 font-semibold">
              email
              <input type="email" name='email' className='input' placeholder='John@email.com' required value={form.email} onChange={handleChange}/>
            </label>

            <label className="text-white/40 font-semibold">
              Message
              <textarea name='message' rows={4} className='textarea' placeholder='Message' required value={form.message} onChange={handleChange}></textarea>
            </label>

            <button type='submit' disabled={isLoading} className="btn">{isLoading ? 'Sending..' : 'Send' }</button>
          </form>
        </div>

        <div className='flex-1 min-w-[50%] flex flex-col'>
          <div className='lg:mx-10 lg:border border-blue-400 subhead-text rounded-lg w-full h-full my-[100px] text-blue-400 items-center justify-center flex text-center'>
            <div>
              <p className='lg:mx-5 sm:mx-0'>Questions, bug reports, feedbacks</p>
              <p className='lg:mx-5 sm:mx-0'>↓</p>
              <p className='lg:mx-5 sm:mx-0'>We are here for it all.</p>
            </div>
          </div>
        </div>
    </section>
    </>
  )
}

export default Contact
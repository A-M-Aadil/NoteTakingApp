import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CreateNote = () => {
  // variables
  const [form, setForm] = useState({ title: '', content: '' })
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem("authToken");
  const today = new Date()
  const currDate = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, message: "" });

  // check user authentication
  const checkUserAuth = async () => {
    // verifiy auth token
    if (token) {
      await axios.get("https://us-central1-notetakingapi.cloudfunctions.net/app/api/user/loggeduserdata", { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) => {
          // if user not logged in then navigate sign in page
          if (!res.data.user) {
            localStorage.removeItem("authToken")
            navigate("/signin")
          } else {
            setUserId(res.data.user._id)
          }
        })
    }
  }
  checkUserAuth()

  // get user inputs from form
  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value })
  }

  // note create function
  const handlCreateNote = async (e) => {
    e.preventDefault()

    // post data to database
    try {

      await axios.post("https://us-central1-notetakingapi.cloudfunctions.net/app/api/note/create", {
        title: form.title,
        content: form.content,
        user: userId,
        date: currDate
      })
        .then((res) => {
          console.log(res)
          if (res.data.status === "success") {
            navigate("/app")
            // alert
            setIsSuccess(true)
            setShowAlert({ show: true, message: res.data.message });
            setTimeout(() => {
              setShowAlert(false);
            }, [3000]);
          } else {
            // alert
            setIsSuccess(false)
            setShowAlert({ show: true, message: res.data.message });

            setTimeout(() => {
              setShowAlert(false);
            }, [3000]);
          }
        })
    } catch (error) {
      // alert
      setIsSuccess(false)
      setShowAlert({ show: true, message: errormessage });

      setTimeout(() => {
        setShowAlert(false);
      }, [3000]);
    }
  }
  return (
    <>
      {showAlert.show ? <div className='top-20 w-full h-full fixed flex justify-center items-start z-10'>
        <motion.div initial={{ y: -500 }} animate={{ y: 0 }} transition={{ duration: "0.5" }} className={`h-[60px] ${isSuccess ? 'bg-green-500' : 'bg-red-600'} text-white font-semibold font-poppins text-xl flex items-center justify-center p-5 rounded-lg`}>
          {isSuccess ? `${showAlert.message} 😄` : `${showAlert.message} 😟`}
        </motion.div>
      </div> : null
      }
      <section className='relative flex lg:flex-row flex-col max-container'>
        <div className='w-full grid'>

          <form onSubmit={handlCreateNote} className='w-full flex flex-col gap-7 mt-8'>

            <div className='w-full h-24 bg-black-500 flex items-center'>
              <div className='flex justify-between items-center m-5 w-full'>
                <div className='btn-back mx-5 cursor-pointer font-bold text-lg' onClick={() => { navigate(-1) }}>←</div>
                <button type='submit' className='btn-note mx-5'>Add Note</button>
              </div>
            </div>

            <label className="text-white/40 font-semibold">
              Title
              <input type="text" name='title' className='bg-white/10 text-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 font-normal shadow-card' placeholder='Note title' maxLength={70} required value={form.title} onChange={handleChange} />
            </label>

            <label className="text-white/40 font-semibold">
              Note
              <textarea type="text" rows={10} name='content' className='bg-white/10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 font-normal shadow-card text-slate-300' required value={form.content} placeholder='Youre Note..' onChange={handleChange} />
            </label>
          </form>
        </div>
      </section>
    </>
  )
}

export default CreateNote
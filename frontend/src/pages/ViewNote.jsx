import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const ViewNote = () => {
    const [form, setForm] = useState({ title: '', content: '' })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken");
    const {id} = useParams()
    const today = new Date()
    const currDate = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()
    const [isSuccess, setIsSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState({show:false, message:""});

  const checkUserAuth = async() =>{
    if (token) {
      await axios.get("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/user/loggeduserdata", {headers: {"Authorization": `Bearer ${token}`}})
      .then((res)=>{
        if (!res.data.user) {
          localStorage.removeItem("authToken")
          navigate("/signin")
        }
      })
    }
  }

    checkUserAuth()

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }

    const getNotes = async () =>{
        await axios.get("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/notes/", {headers: {"Authorization": `Bearer ${token}`}})
          .then((res)=>{
            const notedata = res.data.data.find(note=> id === note._id)
            setForm({title:notedata.title, content:notedata.content})
          })
        
      }

  const handlUpdateNote = async (e) => {
    e.preventDefault()
    try {
      
      await axios.patch("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/note/update", {
        id: id,
        title: form.title,
        content: form.content,
        date:currDate
      })
        .then((res) => {
          if (res.data.status === "success") {
            navigate("/app")
            setIsSuccess(true)
                setShowAlert({show:true, message:res.data.message});
                setTimeout(() => {
                  setShowAlert(false);
                }, [3000]);
          } else {
            setIsSuccess(false)
                setShowAlert({show:true, message:res.data.message});
                
                setTimeout(() => {
                  setShowAlert(false);
                }, [3000]);
          }
        })
    } catch (error) {
      setIsSuccess(false)
            setShowAlert({ show: true, message: errormessage });

            setTimeout(() => {
              setShowAlert(false);
            }, [3000]);
    }
  }

  const handleNoteDelete = async (userid) =>{
    try {
      await axios.post("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/note/delete", {id:userid})
        .then((res) => {
          console.log(res)
          if (res.data.status === "success") {
            navigate("/app")
            setIsSuccess(true)
                setShowAlert({show:true, message:res.data.message});
                setTimeout(() => {
                  setShowAlert(false);
                }, [3000]);
          } else {
            setIsSuccess(false)
                setShowAlert({show:true, message:res.data.message});
                
                setTimeout(() => {
                  setShowAlert(false);
                }, [3000]);
          }
        })
    } catch (error) {
      setIsSuccess(false)
            setShowAlert({ show: true, message: errormessage });

            setTimeout(() => {
              setShowAlert(false);
            }, [3000]);
    }
  }

  useEffect(() => {
    getNotes()
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

                <form onSubmit={handlUpdateNote} className='w-full flex flex-col gap-7 mt-8'>

                    <div className='w-full h-24 bg-black-500 flex items-center'>
                        <div className='flex justify-between items-center m-5 w-full'>
                            <div className='btn-back mx-5 cursor-pointer font-bold text-lg' onClick={()=>{navigate(-1)}}>←</div>
                            <div className='flex'>
                            <button type='submit' className='btn-note mx-1 md:mx-5'>Save Note</button>
                            <div onClick={()=>{handleNoteDelete(id)}} className='btn-del mx-1 md:mx-5 cursor-pointer'>Delete Note</div>
                            </div>
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

export default ViewNote
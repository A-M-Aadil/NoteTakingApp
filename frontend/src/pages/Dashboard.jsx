import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";

const Dashboard = () => {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("authToken");


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

  const getNotes = async () =>{
    setIsLoading(true)
    await axios.get("http://127.0.0.1:5001/notetakingapi/us-central1/app/api/notes/", {headers: {"Authorization": `Bearer ${token}`}})
      .then((res)=>{
        setNotes(res.data.data)
        setIsLoading(false)
      })
    
  }

  const handleNote = (id) =>{
    navigate(`/note/view/${id}`)
  }

  

  useEffect(() => {
    getNotes()
  }, [])
  

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>

      {isLoading ?
        <>
          <div className='w-full flex items-center justify-center'>
            <div className='w-[100px] h-[100px] border-2 border-t-4 border-t-blue-500 rounded-full animate-spin'>
            </div>
          </div>
        </>
        :
        <div className='grid w-full'>
          <div className='w-full h-24 bg-black-500 flex items-center'>
            <div className='flex justify-between items-center m-5 w-full'>
              <div className='w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer' onClick={()=>{navigate("/profile")}}>
                <VscAccount className='w-full h-full text-white m-1' />
              </div>

              <button className='btn' onClick={()=>{navigate("/note/create")}}>New Note</button>
            </div>


          </div>

          <div className=' mt-16'>
            <div className='grid md:grid-cols-3 gap-4 mt-5'>

              {
                notes.map((note)=>(
                  note ? 
                  <div className='w-full h-[200px] border rounded-lg border-slate-600 flex items-center justify-center text-slate-400 shadow-lg cursor-pointer' key={note.title} onClick={()=>{handleNote(note._id)}}>
                    <div className='m-5'>
                      <p className='subhead-text text-blue-400'>{note.title}</p>
                      <div className=' mt-3 flex flex-col gap-3 text-slate-400 text-justify'>
                        {note.date ? <p className='mx-1'>Last Edit {note.date}</p>:<></>}
                      </div>
                    </div>
                  </div>
                  :
                  <div className='w-full h-[200px] border rounded-lg border-slate-600 flex items-center justify-center text-slate-400 shadow-lg cursor-pointer'>
                    <div className='m-5'>
                      <p className='subhead-text text-blue-400'>Create Your First Note</p>
                      <div className=' mt-3 flex flex-col gap-3 text-slate-400 text-justify'>
                        <p>click to new note..</p>
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      }

    </section>
  )
}

export default Dashboard
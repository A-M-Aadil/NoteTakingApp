import React from 'react'

const About = () => {
  return (
    <section className='max-container'>
        <div className='flex items-center'>
            <div className=''>
                <h1 className='head-text blue-gradient_text'>Note ü</h1>

                <div className=' mt-5 flex flex-col gap-3 text-slate-400 text-justify'>
                    <p>Welcome to Note ü, the ultimate note-taking web app designed to make your life easier and more organized. Say goodbye to scattered notes and hello to a seamless note-taking experience. </p>
                </div>

                <div className=' mt-5 flex flex-col gap-3 text-slate-400 text-justify'>
                    <p>Note ü was born out of a simple desire to revolutionize the way people take and manage notes. We understand the frustration of losing important information or struggling to find a specific note when you need it the most. That's why we set out to create a solution that combines functionality with user-friendly design, empowering individuals to capture, organize, and access their notes effortlessly.</p>
                </div>


                <div className=' mt-8 flex flex-col gap-3 text-slate-200 text-justify'>
                    <p>Our Mission</p>
                </div>

                <div className=' mt-5 flex flex-col gap-3 text-slate-400 text-justify'>
                    <p>At Note ü, our mission is to streamline the note-taking process and enhance productivity for our users. We believe that everyone deserves a reliable platform to store their thoughts, ideas, and to-do lists, without the hassle of traditional notebooks or scattered digital files. With Nate, we aim to empower individuals to focus on what truly matters by providing a secure and intuitive note-taking experience.</p>
                </div>

                <div className=' mt-8 flex flex-col gap-3 text-slate-200 text-justify'>
                    <p>Features</p>
                </div>

                <div class="grid md:grid-cols-3 gap-4 mt-5">
                    <div className='w-full h-[200px] border rounded-lg border-slate-600 flex items-center justify-center text-slate-400 shadow-lg'>
                        <div className='m-5'>
                            <p className='subhead-text text-blue-400'>Cloud</p>
                            <div className=' mt-3 flex flex-col gap-3 text-slate-400 text-justify'>
                                <p>Access your notes from anywhere, on any device, with seamless cloud synchronization</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[200px] border rounded-lg border-slate-600 flex items-center justify-center text-slate-400 shadow-lg'>
                        <div className='m-5'>
                            <p className='subhead-text text-blue-400'>Security</p>
                            <div className=' mt-3 flex flex-col gap-3 text-slate-400 text-justify'>
                                <p>Your data is safe with us. We prioritize your privacy and security, so you can focus on your notes worry-free.</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[200px] border rounded-lg border-slate-600 flex items-center justify-center text-slate-400 shadow-lg'>
                        <div className='m-5'>
                            <p className='subhead-text text-blue-400'>Customizable</p>
                            <div className=' mt-3 flex flex-col gap-3 text-slate-400 text-justify'>
                                <p>Create, Edit, Delete, Save your notes</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' mt-8 flex flex-col gap-3 text-slate-400 text-justify'>
                    <p>Join the Note ü community today and experience the difference. Welcome to the future of note-taking.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About
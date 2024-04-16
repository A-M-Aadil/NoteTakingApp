import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import {Home, Signup, Signin, Contact, About, Resetpassword , ForgetPassword, Dashboard, CreateNote, ViewNote, Profile} from "./pages"

const App = () => {
  return (
    <main className="bg-slate-800">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/app" element={<Dashboard/>}/>
          <Route path="/resetpassword/:id/:token" element={<Resetpassword/>}/>
          <Route path="/forgetpassword" element={<ForgetPassword/>}/>
          <Route path="/note/create" element={<CreateNote/>}/>
          <Route path="/note/view/:id" element={<ViewNote/>}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App
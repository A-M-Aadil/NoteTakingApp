import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import {Home, Signup, Signin} from "./pages"

const App = () => {
  return (
    <main className="bg-slate-800">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/about" element={"About"}/>
          <Route path="/app" element={"App"}/>
          <Route path="/profile" element={"Profile"}/>
          <Route path="/resetpassword" element={"Reset"}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App
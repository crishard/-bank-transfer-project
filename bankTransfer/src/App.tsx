import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { LoginPage } from "./pages/Login"
import { RegisterPage } from "./pages/Register"
import "./styles/global.css"


export function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

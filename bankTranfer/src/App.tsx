import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import "./styles/global.css"


export function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

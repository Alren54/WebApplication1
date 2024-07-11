import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import TeachBot from '../Pages/TeachBot'
import SSS from '../Pages/SSS'
import About from '../Pages/About'
import Suggestions from '../Pages/Suggestions'

export default function SiteRoutes(notes){
    return(
        <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/teachbot" element={<TeachBot notes={notes}/>}/>
      <Route path="/SSS" element={<SSS/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/suggestions" element={<Suggestions/>}/>
      
      </Routes>
    )
}
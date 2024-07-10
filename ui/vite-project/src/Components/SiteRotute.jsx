import { Route, Routes } from 'react-router-dom'

import Home from '../Pages/Home'
import TeachBot from '../Pages/TeachBot'
import SSS from '../Pages/SSS'

export default function SiteRoutes(){
    return(
        <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/teachbot" element={<TeachBot/>}/>
      <Route path="/SSS" element={<SSS/>}/>

      </Routes>
    )
}
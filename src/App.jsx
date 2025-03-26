import React from 'react'
import "./App.css"
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Appform from './Components/Appform'
import Hrdashbord from './Pages/Hrdashbord'
import Feedback from './Pages/Feedback'

const App = () => {
  return (
    <div>
      <Appform/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/hr' element={<Hrdashbord/>}/>
        <Route path='/fb' element={<Feedback/>}/>
      </Routes>
    </div>
  )
}

export default App
import React, { useContext } from 'react'
import hr from "../../public/hr.png"
import hr1 from "../../public/hr1.png"
import hr2 from "../../public/hr2.png"
import { Dataprovider } from '../Components/Dataprovider'
import { useNavigate } from 'react-router-dom'
const Homepage = () => {
    const navigate=useNavigate()
        const {forms}=useContext(Dataprovider)
        const [form,setform]=forms
  return (
    <div className='home'>
        <div className='homenav'>
            <h1>Recruitment Portal</h1>
            <div>
                <button onClick={()=>setform(true)}>Find a job</button>
                <button onClick={()=>navigate("/hr")} style={{backgroundColor:"rgb(63,81,181)",color:"white"}}>Hire Now</button>
            </div>
        </div>
        <div className='homecontent'>
            <div className='hr1'>
                <img src={hr1} alt="img" />
            </div>
            <div className='hr'>
                <h1 style={{textAlign:"center"}}>India’s Largest Job Portal</h1>
                <p>Recruitment Portal helps you hire staff in 2 days</p>
                <img src={hr} alt="img" draggable="false"/>
                <span>
                    <button onClick={()=>navigate("/hr")}>Hire now</button>
                    <button onClick={()=>setform(true)}>Get a job</button>
                </span>
            </div>
            <div className='hr2'>
            <img src={hr2} alt="img" />
            </div>
        </div>
    </div>
  )
}

export default Homepage
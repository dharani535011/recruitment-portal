import React, { useContext, useState } from 'react'
import { Dataprovider } from '../Components/Dataprovider'
import Applicantdetials from '../Components/Applicantdetials'
import { useNavigate } from 'react-router-dom'

const Hrdashbord = () => {
    const {datas,ids,userdets}=useContext(Dataprovider)
    const [data,setdata]=datas
    const [id,setid]=ids
    const [userdet,setuserdet]=userdets
        const [search,setsearch]=useState("")
        const [fil,setfil]=useState(false)
        const [op,setop]=useState("")
    // const detials=JSON.parse(data)
    // console.log(data)
    const dat=op?data.filter((val)=>val.status===op):data
    const dd=search?dat.filter((val)=>
        val.name.toLowerCase().includes(search.toLowerCase()) ||
    val.email.toLowerCase().includes(search.toLowerCase()) ||
    val.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
    val.phone.includes(search)
    ):dat
    const nav=useNavigate()
  return (
    <>
    <Applicantdetials/>
    <div className='i' onClick={()=>nav("/fb")}>
        I
    </div>
    <div className='finput'>
         <input type="text" placeholder='Search..' value={search} onChange={(e)=>setsearch(e.target.value)}/>
         <div className='connect' >
         <button className='filter'  onMouseEnter={()=>setfil(true)}>Filter</button>
         <div className='ff' onMouseLeave={()=>setfil(false)} style={{display:fil?"flex":"none"}}>
            <p style={{backgroundColor:op==""?"white":"rgb(76,94,170)"}} onClick={()=>setop("")}>All</p>
            <p style={{backgroundColor:op=="Pending"?"white":"rgb(76,94,170)"}} onClick={()=>setop("Pending")}>Pending</p>
            <p style={{backgroundColor:op=="Scheduled"?"white":"rgb(76,94,170)"}} onClick={()=>setop("Scheduled")}>Scheduled</p>
            <p style={{backgroundColor:op=="Hired"?"white":"rgb(76,94,170)"}} onClick={()=>setop("Hired")}>Hired</p>
            <p style={{backgroundColor:op=="Rejected"?"white":"rgb(76,94,170)"}} onClick={()=>setop("Rejected")}>Rejected</p>
         </div>
         </div>
   </div>
    <div className='hr'>
        <div className='hrnav'>
           <h1>HR Dashboard</h1>
        </div>
        <div className='applicant'>
          {
            dd.map((val,i)=>(
                <div key={i} className='card' onClick={()=>{
                    setuserdet(true)
                    // console.log(val)
                    setid(val.email)}}>
              <p>Name : {val.name}</p>
              <p>Mail Id:{val.email}</p>
              <p>Phone No:{val.phone}</p>
                </div>
            ))
          }
        </div>
    </div>
    </>
  )
}

export default Hrdashbord
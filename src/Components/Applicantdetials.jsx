import React, { useContext, useState } from 'react'
import { Dataprovider } from './Dataprovider'
import axios from 'axios'

const Applicantdetials = () => {
    const {datas,ids,userdets,reloaders}=useContext(Dataprovider)
    const [data,setdata]=datas
    const [reloader,setReloader]=reloaders
    const [load,setLoad]=useState(false)
    const [status,setStatus]=useState(true)
    const [id,setid]=ids
    const [selectedInterviewers, setSelectedInterviewers] = useState([])
    
    const handleSelectChange = (event) => {
      let hr = 0
      let tech = 0
      let task = 0
      let selectedValues = []
  
      Array.from(event.target.selectedOptions).forEach(option => {
          if ((option.value === "jhon@gmail.com" || option.value === "vinoth@gmail.com") && hr === 0) {
              hr += 1
              selectedValues.push(option.value)
          } else if (option.value === "jhon@gmail.com" || option.value === "vinoth@gmail.com") {
              alert("HR Already Selected")
          }
  
          if ((option.value === "ramanan@gmail.com" || option.value === "sam@gmail.com") && tech === 0) {
              tech += 1
              selectedValues.push(option.value)
          } else if (option.value === "ramanan@gmail.com" || option.value === "sam@gmail.com") {
              alert("Technical interviewer Already Selected")
          }
  
          if ((option.value === "umarali@gmail.com" || option.value === "joseph@gmail.com") && task === 0) {
              task += 1
              selectedValues.push(option.value)
          } else if (option.value === "umarali@gmail.com" || option.value === "joseph@gmail.com") {
              alert("Task interviewer Already Selected")
          }
      })
  
      if (selectedValues.length <= 3) {
          setSelectedInterviewers(selectedValues)
      } else {
          alert("You can only select up to 3 interviewers.")
      }
  }
  
    const [userdet,setuserdet]=userdets
    const res = Array.isArray(data) ? data.find((val) => val.mail === id) : ""
    // console.log(res)
   const handlesub=async()=>{
    try {
      setLoad(true)
      const ress=await axios.post("https://recruitmentportalbackend.onrender.com/applicant/asign-interviewer",{
        interviewers:selectedInterviewers,
        appMail:res.mail
      })
      alert(ress.data.message)
    } catch (error) {
      console.log(error.message)
    }finally{
      setLoad(false)
      setReloader(!reloader)
    }
   if(res.interviewers.length==3) {
    res.status="Scheduled"
    setuserdet(false)
    alert("interview arranged")
}
   }
const handlechange=async() => {

   try {
    setStatus(false)
    const ress=await axios.post("https://recruitmentportalbackend.onrender.com/applicant/changestatus",{
      mail:res.mail,
      status:res.status=="hired"?"rejected":"hired"
    },{withCredentials:true})
    alert(ress.data.message)
   } catch (error) {
    console.log(error.message)
   }finally{
    setReloader(!reloader)
    setStatus(true)
   }

  setdata(prevData => prevData.map(item =>
    item.mail === res.mail
      ? { ...item, status: item.status === "hired" ? "rejected" : "hired" }
      : item
  ))
}
// console.log(res.resume.split("uploads")[1])
  return (
   <>
 
    <div className='applicantdetial' style={{left:userdet?"0":"-110%"}}>
         <div className='det'>
            <div className='hamburger' onClick={()=>setuserdet(false)}>
               <p></p>
               <p></p>
            </div>
         {
            res&&<div className='dd'>
                <h1>Appicant Detials :</h1>
            <p>Name : {res.name}</p>
            <p>Mail : {res.mail}</p>
            <p>Phone : {res.phone}</p>
            <p>Skills : {res.skills.join(", ")}</p>
            <p>status : {res.status}</p>
            <a href={`https://recruitmentportalbackend.onrender.com/uploads${res.resume.split("uploads")[1]}`} target='_blank' className='res'>Resume</a>
            <p>Interview Results:</p>
            <div className='tech' style={{display:res.tech.person!==""?"flex":"none"}}>
                
                <p>Interviewer : {res.tech.person}</p>
                <p>Strengths & Weaknesses : {res.tech.saw}</p>
                <p>Rating : {res.tech.rating}</p>
                <p>Feedback : {res.tech.feedback}</p>
                <p>Overall Decision : {res.tech.overall}</p>
            </div>
            <div style={{display:res.task.person!==""?"flex":"none"}} className='tech'>
                
                <p>Interviewer : {res.task.person}</p>
                <p>Strengths & Weaknesses : {res.task.saw}</p>
                <p>Rating : {res.task.rating}</p>
                <p>Feedback : {res.task.feedback}</p>
                <p>Overall Decision : {res.task.overall}</p>
            </div>
            <div style={{display:res.hr.person!==""?"flex":"none"}} className='tech'>
                
                <p>Interviewer : {res.hr.person}</p>
                <p>Strengths & Weaknesses : {res.hr.saw}</p>
                <p>Rating : {res.hr.rating}</p>
                <p>Feedback : {res.hr.feedback}</p>
                <p>Overall Decision : {res.hr.overall}</p>
            </div>
            <div className='pro'>
                  {
                    res.status=="pending"&& <div className='schedule'>
                         <p >Schedule Interview : </p>
                   <select className='sec' name="Interviewer" multiple onChange={handleSelectChange}>
                    <option value="jhon@gmail.com">{`Jhon(HR)`}</option>
                    <option value="sam@gmail.com">{`Sam(Tech)`}</option>
                    <option value="vinoth@gmail.com">{`Vinoth(HR)`}</option>
                    <option value="umarali@gmail.com">{`Umar ali(Task)`}</option>
                    <option value="joseph@gmail.com">{`Joseph(Task)`}</option>
                    <option value="ramanan@gmail.com">{`Ramanan(Tech)`}</option>
                   </select>
                    </div>
                  }
                  {res.status=="pending"&& <button disabled={load} onClick={handlesub}>{load?"Loading...":"Proceed"}</button>}
                  {(res.status !== "pending" && res.count == 3) && (
  <button disabled={!status} style={{backgroundColor:res.status=="hired"?"green":"red"}} onClick={handlechange}>
    {status?(res.status==="scheduled"?"rejected":res.status):("Loading...")}
  </button>
)}


            </div>
   </div>
         }
         </div>
    </div>
   </>
  )
}

export default Applicantdetials
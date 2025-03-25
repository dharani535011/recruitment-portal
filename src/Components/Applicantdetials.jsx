import React, { useContext, useState } from 'react'
import { Dataprovider } from './Dataprovider'

const Applicantdetials = () => {
    const {datas,ids,userdets}=useContext(Dataprovider)
    const [data,setdata]=datas
 
    const [id,setid]=ids
    const [selectedInterviewers, setSelectedInterviewers] = useState([])
    const handleSelectChange = (event) => {
       
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
        if (selectedValues.length <= 3) {
            // console.log(selectedInterviewers)
            setSelectedInterviewers(selectedValues);
            
        } else {
            alert("You can only select up to 3 interviewers.");
        }
    }
    const [userdet,setuserdet]=userdets
    const res = Array.isArray(data) ? data.find((val) => val.email === id) : undefined;
   
   const handlesub=()=>{
    res.interviewers=selectedInterviewers
   if(res.interviewers.length==3) {
    res.status="Scheduled"
    setuserdet(false)
    alert("interview arranged")

}
   }
   

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
            <p>Mail : {res.email}</p>
            <p>Phone : {res.phone}</p>
            <p>Skills : {res.skills.join(", ")}</p>
            <p>Status : {res.status}</p>
            <a className='res'>Resume</a>
            <p>Interview Results:</p>
            <div className='tech' style={{display:res.count===3?"flex":"none"}}>
                
                <p>Interviewer : {res.tech1.person}</p>
                <p>Strengths & Weaknesses : {res.tech1.Strengthsandweaknesses}</p>
                <p>Rating : {res.tech1.rating}</p>
                <p>Feedback : {res.tech1.feedback}</p>
                <p>Overall Decision : {res.tech1.OverallDecision}</p>
            </div>
            <div style={{display:res.count===3?"flex":"none"}} className='tech'>
                
                <p>Interviewer : {res.tech2.person}</p>
                <p>Strengths & Weaknesses : {res.tech2.Strengthsandweaknesses}</p>
                <p>Rating : {res.tech2.rating}</p>
                <p>Feedback : {res.tech2.feedback}</p>
                <p>Overall Decision : {res.tech2.OverallDecision}</p>
            </div>
            <div style={{display:res.count===3?"flex":"none"}} className='tech'>
                
                <p>Interviewer : {res.tech3.person}</p>
                <p>Strengths & Weaknesses : {res.tech3.Strengthsandweaknesses}</p>
                <p>Rating : {res.tech3.rating}</p>
                <p>Feedback : {res.tech3.feedback}</p>
                <p>Overall Decision : {res.tech3.OverallDecision}</p>
            </div>
            <div className='pro'>
                  {
                    res.status=="Pending"&& <div className='schedule'>
                         <p >Schedule Interview : </p>
                   <select name="Interviewer" multiple onChange={handleSelectChange}>
                    <option value="jhon@gmail.com">{`Jhon(HR)`}</option>
                    <option value="sam@gmail.com">{`Sam(Tech)`}</option>
                    <option value="vinoth@gmail.com">{`Vinoth(HR)`}</option>
                    <option value="umarali@gmail.com">{`Umar ali(Task)`}</option>
                    <option value="joseph@gmail.com">{`Joseph(Task)`}</option>
                    <option value="ramanan@gmail.com">{`Ramanan(Tech)`}</option>
                   </select>
                    </div>
                  }
                  {res.status=="Pending"&& <button onClick={handlesub}>Proceed</button>}
                  {(res.status !== "Pending" && res.count === 3) && (
  <button style={{backgroundColor:res.status=="Hired"?"green":"red"}} onClick={() => {
    setdata(prevData => prevData.map(item =>
      item.mail === res.mail
        ? { ...item, status: item.status === "Hired" ? "Rejected" : "Hired" }
        : item
    ));
  }}>
    {res.status}
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
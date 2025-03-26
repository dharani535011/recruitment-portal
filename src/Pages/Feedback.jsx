import React, { useContext, useState } from "react"
import { Dataprovider } from "../Components/Dataprovider"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Feedback = () => {
    const {datas,reloaders}=useContext(Dataprovider)
    const [data,setdata]=datas
    const [reloader,setReloader]=reloaders
  const [formData, setFormData] = useState({
    applicantMail: "",
    interviewerMail: "",
    overallDecision: "",
    rating: 0,
    strengthsAndWeaknesses: "",
    feedback: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
  //  console.log(formData)
       try {
        const res=await axios.post("https://recruitmentportalbackend.onrender.com/applicant/review",{
          applicantMail:formData.applicantMail,
          interviewerMail:formData.interviewerMail,
          feedback:formData.feedback,
          overall:formData.overallDecision,
          rating:formData.rating,
          saw:formData.strengthsAndWeaknesses
        },{withCredentials:true})
        alert(res.data.message)
       } catch (error) {
        console.log(error.message)
       }finally{
        setReloader(!reloader)
       }

    // Reset the form
    setFormData({
        applicantMail: "",
        interviewerMail: "",
        overallDecision: "",
        rating: 0,
        strengthsAndWeaknesses: "",
        feedback: "",
    })
}
  const nav=useNavigate()

  return (
   <>
       <div className='i' onClick={()=>nav("/hr")}>
        Back
    </div>
    <div className="fb">
        
        <form className="fbb" onSubmit={handleSubmit}>
          <input
            type="email"
            name="applicantMail"
            placeholder="Applicant Mail Id"
            value={formData.applicantMail}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="interviewerMail"
            placeholder="Interviewer Mail Id"
            value={formData.interviewerMail}
            onChange={handleChange}
            required
          />
          
          <div className="decision">
            <p>Overall Decision:</p>
            <label>
              <input
                type="radio"
                name="overallDecision"
                value="Recommended"
                checked={formData.overallDecision === "Recommended"}
                onChange={handleChange}
              />
              Recommended
            </label>
            <label>
              <input
                type="radio"
                name="overallDecision"
                value="Not Recommended"
                checked={formData.overallDecision === "Not Recommended"}
                onChange={handleChange}
              />
              Not Recommended
            </label>
          </div>
  
          <div className="rating">
            <p>Rating:</p>
            <span>
              {[1, 2, 3, 4, 5].map((num) => (
                <p
                  key={num}
                  className={formData.rating === num ? "selected" : ""}
                  onClick={() => handleRating(num)}
                >
                  {num}
                </p>
              ))}
            </span>
          </div>
  
          <textarea
            name="strengthsAndWeaknesses"
            placeholder="Strengths and weaknesses"
            value={formData.strengthsAndWeaknesses}
            onChange={handleChange}
          ></textarea>
          <textarea
            name="feedback"
            placeholder="Feedback"
            value={formData.feedback}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
   </>
  )
}

export default Feedback

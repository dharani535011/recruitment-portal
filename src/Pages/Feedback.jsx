import React, { useContext, useState } from "react"
import { Dataprovider } from "../Components/Dataprovider"
import { useNavigate } from "react-router-dom"

const Feedback = () => {
    const {datas}=useContext(Dataprovider)
    const [data,setdata]=datas
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

  const handleSubmit = (e) => {
    e.preventDefault()

    // Find the applicant by email
    const res = data.find((val) => val.email === formData.applicantMail)

    // Check if applicant exists
    if (!res) {
        alert("Applicant not found!")
        return
    }

    // Check if interviewer exists in the applicant's interviewers list
    const amm = res?.interviewers?.find((val) => val === formData.interviewerMail)

    if (amm) {
        if(res.count==0){
        res.tech1.rating = formData.rating
        res.tech1.Strengthsandweaknesses = formData.strengthsAndWeaknesses
        res.tech1.OverallDecision = formData.overallDecision
        res.tech1.person = formData.interviewerMail.split("@")[0]
        res.tech1.feedback = formData.feedback
        res.count = (res.count || 0) + 1

        // Update state to trigger re-render
        setdata([...data])  
        alert("Feedback submitted successfully!")}
        else if(res.count==1){
        res.tech2.rating = formData.rating
        res.tech2.Strengthsandweaknesses = formData.strengthsAndWeaknesses
        res.tech2.OverallDecision = formData.overallDecision
        res.tech2.person = formData.interviewerMail.split("@")[0]
        res.tech2.feedback = formData.feedback
        res.count = (res.count || 0) + 1

        // Update state to trigger re-render
        setdata([...data])  
        alert("Feedback submitted successfully!")
        }else if(res.count==2){
        res.tech3.rating = formData.rating
        res.tech3.Strengthsandweaknesses = formData.strengthsAndWeaknesses
        res.tech3.OverallDecision = formData.overallDecision
        res.tech3.person = formData.interviewerMail.split("@")[0]
        res.tech3.feedback = formData.feedback
        res.count = (res.count || 0) + 1

        // Update state to trigger re-render
        setdata([...data])  
        alert("Feedback submitted successfully!")
        }
    } else {
        alert("Interviewer email not found in applicant's records.")
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

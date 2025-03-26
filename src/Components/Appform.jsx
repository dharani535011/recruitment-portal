

import React, { useContext, useState } from "react"
import { Formik, Form } from "formik"
import { Dataprovider } from "./Dataprovider"
import axios from "axios"

const validate = (values, resumeFile) => {
  const errors = {}

  if (!values.name.trim()) errors.name = "Name is required"
  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Invalid email"
  if (!values.phone.trim() || !/^\d{10}$/.test(values.phone)) errors.phone = "Phone must be 10 digits"
  if (values.skills.length === 0) errors.skills = "Select at least one skill"
  if (!resumeFile) errors.resume = "Resume is required"
  if (!values.experience.trim()) errors.experience = "Work experience is required"
  if (!values.education.trim()) errors.education = "Education is required"

  return errors
}

const Appform = () => {
  const { forms, datas,reloaders } = useContext(Dataprovider)
  const [form, setForm] = forms
  const [data, setData] = datas
  const [reloader,setReloader]=reloaders
  const [resumeFile, setResumeFile] = useState(null)
  // const [disabled,setDisabled]=useState(false)
  const skillsOptions = [
    "React", "Node.js", "MongoDB", "MySQL", "JavaScript", "CSS", "HTML", 
    "C++", "C", "Java", "Spring Boot", "mongoose", "Python", "Django", "DSA", "OOPs"
  ]

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        skills: [],
        experience: "",
        education: "",
      }}
      validate={(values) => validate(values, resumeFile)}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setReloader(!reloader)
          const formData = new FormData()
          formData.append("name", values.name)
          formData.append("mail", values.email)
          formData.append("phone", values.phone)
          formData.append("experience", values.experience)
          formData.append("education", values.education)
          formData.append("skills", values.skills) // Convert array to JSON
          formData.append("resume", resumeFile)
        //  console.log(values)
          const res = await axios.post(
            "https://recruitmentportalbackend.onrender.com/applicant/store-detials",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            }
          )
          alert(res.data.message)
          if (res.data.message !== "Applicant Registered") return

          // console.log(resumeFile)
      

          alert("Form Submitted Successfully!")
          setSubmitting(false)
          setResumeFile(null)
          setForm(false)
          resetForm()
        } catch (error) {
          console.error("Error submitting form:", error)
          alert("Submission failed. Please try again.")
          setSubmitting(false)
        }finally{
          setReloader(!reloader)
        }
      }}
    >
      {(formik) => (
        <div className="appform" style={{ top: form ? "0" : "-100%" }}>
          <div className="form">
            <div className="hamburger" onClick={() => {
              setForm(false)
              formik.resetForm()
              setResumeFile(null)
            }}>
              <p></p>
              <p></p>
            </div>
            <div className="forminputs">
              <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>Fill the details:</h1>
              <Form>
                <div>
                  <input type="text" name="name" placeholder="Name" {...formik.getFieldProps("name")} />
                  {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}
                </div>

                <div>
                  <input type="email" name="email" placeholder="Email" {...formik.getFieldProps("email")} />
                  {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}
                </div>

                <div>
                  <input type="text" name="phone" placeholder="Phone" {...formik.getFieldProps("phone")} />
                  {formik.touched.phone && formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
                </div>

                <div>
                  <label>Skills:</label>
                  <select
                    name="skills"
                    multiple
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
                      formik.setFieldValue("skills", selectedOptions)
                    }}
                    onBlur={formik.handleBlur}
                  >
                    {skillsOptions.map((skill, index) => (
                      <option key={index} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                  {formik.touched.skills && formik.errors.skills && <p className="error">{formik.errors.skills}</p>}
                </div>

                <div>
                  <label>Upload Resume:</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => setResumeFile(event.target.files[0])}
                    className="form-control"
                    style={{ backgroundColor: "#007bff", color: "white", borderRadius: "2px" }}
                  />
                  {formik.errors.resume && <p className="error">{formik.errors.resume}</p>}
                </div>

                <div>
                  <textarea name="experience" placeholder="Work Experience" {...formik.getFieldProps("experience")} />
                  {formik.touched.experience && formik.errors.experience && <p className="error">{formik.errors.experience}</p>}
                </div>

                <div>
                  <textarea name="education" placeholder="Education" {...formik.getFieldProps("education")} />
                  {formik.touched.education && formik.errors.education && <p className="error">{formik.errors.education}</p>}
                </div>

                <button type="submit" className="btn btn-primary mt-3" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? "Submitting..." : "Proceed"}
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Appform

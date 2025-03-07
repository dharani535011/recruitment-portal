
import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { Dataprovider } from "./Dataprovider";

const validate = (values, resumeFile) => {
  const errors = {};

  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Invalid email";
  if (!values.phone.trim() || !/^\d{10}$/.test(values.phone)) errors.phone = "Phone must be 10 digits";
  if (values.skills.length === 0) errors.skills = "Select at least one skill";
  if (!resumeFile) errors.resume = "Resume is required";
  if (!values.experience.trim()) errors.experience = "Work experience is required";
  if (!values.education.trim()) errors.education = "Education is required";

  return errors;
};

const Appform = () => {
    const {forms,datas}=useContext(Dataprovider)
    const [form,setform]=forms
    const [data,setdata]=datas
  const [resumeFile, setResumeFile] = useState(null);
  const skillsOptions = ["React", "Node.js", "MongoDB", "MySQL", "JavaScript", "CSS", "HTML","C++","C","Java","Spring Boot","mongoose","Python","Django","DSA","OOPs"];

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
      onSubmit={(values, { setSubmitting,resetForm }) => {
        setdata((pre)=> [...pre,{
            name: values.name,
            email: values.email,
            phone: values.phone,
            skills: values.skills,
            experience: values.experience,
            education: values.education,
            status: "Pending",
            count: 0,
            interviewers: [],
            tech1: {
                person: "",
                Strengthsandweaknesses: "",
                rating: "",
                OverallDecision: "",
                feedback: ""
            },
            tech2: {
                person: "",
                Strengthsandweaknesses: "",
                rating: "",
                OverallDecision: "",
                feedback: ""
            },
            tech3: {
                person: "",
                Strengthsandweaknesses: "",
                rating: "",
                OverallDecision: "",
                feedback: ""
            }
        }
        ]
       )
        alert("Form Submitted Successfully!");
        setSubmitting(false)
        
        setResumeFile(null)
        setform(false)
        resetForm()
      }}
    >
      {(formik) => (
        <div className="appform" style={{top:form?"0":"-100%"}}>
          <div className="form">
            <div className="hamburger" onClick={()=>{
                setform(false)
                  formik.setValues({
                    name: "",
                    email: "",
                    phone: "",
                    skills: [],
                    experience: "",
                    education: "",
                  })
                  setResumeFile(null)
                }}>
              <p></p>
              <p></p>
            </div>
            <div className="forminputs">
                <h1 style={{fontSize:"25px",marginBottom:"15px"}}>Fill the detials:-</h1>
              <Form>
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone && <p className="error">{formik.errors.phone}</p>}
                </div>

                {/* Skills Multi-Select */}
                <div>
                  <label>Skills:<p className="lap">(press ctrl & select)</p><p className="mob">(long press select)</p></label>
                  <select
  name="skills"
  multiple
  onChange={(e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    formik.setFieldValue("skills", selectedOptions);
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

                {/* Resume Upload */}
                <div>
                  <label>Upload Resume:</label>
                  <input
                  style={{backgroundColor:"#007bff",color:"white",borderRadius:"2px"}}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="form-control"
                    onChange={(event) => setResumeFile(event.currentTarget.files[0])}
                  />
                  {formik.errors.resume && <p className="error">{formik.errors.resume}</p>}
                </div>

                {/* Experience Field */}
                <div>
                  <textarea
                    name="experience"
                    placeholder="Work Experience"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.experience}
                  />
                  {formik.touched.experience && formik.errors.experience && (
                    <p className="error">{formik.errors.experience}</p>
                  )}
                </div>

                {/* Education Field */}
                <div>
                  <textarea
                    name="education"
                    placeholder="Education"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.education}
                  />
                  {formik.touched.education && formik.errors.education && (
                    <p className="error">{formik.errors.education}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary mt-3" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? "Submitting..." : "Proceed"}
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Appform;

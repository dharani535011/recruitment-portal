import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Dataprovider } from "./Dataprovider";

const ApplicantForm = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const {datas}=useContext(Dataprovider)
  const [data,setdata]=datas
  const skillsOptions = ["React", "Node.js", "MongoDB", "MySQL", "JavaScript", "CSS", "HTML"];

  const validateForm = (values) => {
    let errors = {};

    if (!values.name.trim()) errors.name = "Name is required";
    if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Invalid email";
    if (!values.phone.trim() || !/^\d{10}$/.test(values.phone)) errors.phone = "Phone must be 10 digits";
    if (values.skills.length === 0) errors.skills = "Select at least one skill";
    if (!resumeFile) errors.resume = "Resume is required";
    if (!values.experience.trim()) errors.experience = "Work experience is required";
    if (!values.education.trim()) errors.education = "Education is required";

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const errors = validateForm(values);
    setErrorMessages(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("skills", JSON.stringify(values.skills));
    formData.append("resume", resumeFile);
    formData.append("experience", values.experience);
    formData.append("education", values.education);
    
   setdata((pre)=> [...pre,{
        name: "",
        email: "",
        phone: "",
        skills: [],
        experience: "",
        education: "",
        status: "Pending",
        count: 0,
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
    setSubmitting(false);
  };

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
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="container">
          <div className="mb-3">
            <label>Name:</label>
            <Field type="text" name="name" className="form-control" />
            {errorMessages.name && <div className="text-danger">{errorMessages.name}</div>}
          </div>

          <div className="mb-3">
            <label>Email:</label>
            <Field type="email" name="email" className="form-control" />
            {errorMessages.email && <div className="text-danger">{errorMessages.email}</div>}
          </div>

          <div className="mb-3">
            <label>Phone:</label>
            <Field type="text" name="phone" className="form-control" />
            {errorMessages.phone && <div className="text-danger">{errorMessages.phone}</div>}
          </div>

          <div className="mb-3">
            <label>Skills (Select multiple with Ctrl/Command):</label>
            <Field as="select" name="skills" multiple className="form-control"
              onChange={(e) => {
                const options = [...e.target.selectedOptions].map(option => option.value);
                setFieldValue("skills", options);
              }}>
              {skillsOptions.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </Field>
            {errorMessages.skills && <div className="text-danger">{errorMessages.skills}</div>}
          </div>

          {/* Display selected skills */}
          {values.skills.length > 0 && (
            <div className="mb-3">
              <label>Selected Skills:</label>
              <ul>
                {values.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-3">
            <label>Upload Resume (PDF/DOC):</label>
            <input type="file" accept=".pdf,.doc,.docx" className="form-control"
              onChange={(event) => {
                setResumeFile(event.currentTarget.files[0]);
              }} />
            {errorMessages.resume && <div className="text-danger">{errorMessages.resume}</div>}
          </div>

          <div className="mb-3">
            <label>Work Experience:</label>
            <Field as="textarea" name="experience" className="form-control" />
            {errorMessages.experience && <div className="text-danger">{errorMessages.experience}</div>}
          </div>

          <div className="mb-3">
            <label>Education:</label>
            <Field as="textarea" name="education" className="form-control" />
            {errorMessages.education && <div className="text-danger">{errorMessages.education}</div>}
          </div>

          <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting || values.skills.length === 0}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ApplicantForm;

import { createContext, useState } from "react";

export const Dataprovider=createContext()
export const Contextprovider=({children})=>{
    const [form,setform]=useState(false)
    const [id,setid]=useState("")
    const [userdet,setuserdet]=useState(false)
    const [data,setdata]= useState([
        {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "9876543210",
            skills: ["React", "Node.js", "MongoDB", "Node.js", "MongoDB", "Node.js", "MongoDB"],
            experience: "3 years",
            education: "B.Tech in Computer Science",
            status: "Pending",
            count: 0,
            interviewers: [],
            tech1: {
                person: "Alice Smith",
                Strengthsandweaknesses: "Good To open a PDF in your React component when a user clicks on a link or button, you can follow these methods:",
                rating: "4.5",
                OverallDecision: "2025-03-10",
                feedback: "Strong React knowledge To open a PDF in your React component when a user clicks on a link or button, you can follow these methods:"
            },
            tech2: {
                person: "Bob Johnson",
                Strengthsandweaknesses: "Average To open a PDF in your React component when a user clicks on a link or button, you can follow these methods:",
                rating: "3.8",
                OverallDecision: "2025-03-12",
                feedback: "Needs improvement in Node.js To open a PDF in your React component when a user clicks on a link or button, you can follow these methods:"
            },
            tech3: {
                person: "Charlie Brown",
                Strengthsandweaknesses: "Excellent To open a PDF in your React component when a user clicks on a link or button, you can follow these methods:",
                rating: "4.9",
                OverallDecision: "2025-03-15",
                feedback: "Great MongoDB expertise To open a PDF in your React component when a user clicks on a link or button, you can follow these methods:"
            }
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "9234567890",
            skills: ["Java", "Spring Boot", "MySQL"],
            experience: "5 years",
            education: "M.Sc in Software Engineering",
            status: "Hired",
            count: 3,
            interviewers: [],
            tech1: {
                person: "David Wilson",
                Strengthsandweaknesses: "Excellent",
                rating: "5.0",
                OverallDecision: "2025-03-08",
                feedback: "Strong Java skills"
            },
            tech2: {
                person: "Emma Davis",
                Strengthsandweaknesses: "Good",
                rating: "4.2",
                OverallDecision: "2025-03-10",
                feedback: "Decent Spring Boot knowledge"
            },
            tech3: {
                person: "Liam Miller",
                Strengthsandweaknesses: "Average",
                rating: "3.7",
                OverallDecision: "2025-03-12",
                feedback: "Needs better SQL optimization skills"
            }
        },
        {
            name: "Michael Johnson",
            email: "michael.j@example.com",
            phone: "9123456789",
            skills: ["JavaScript", "TypeScript", "React"],
            experience: "2 years",
            education: "B.Sc in Computer Applications",
            status: "Rejected",
            count: 3,
            interviewers: [],
            tech1: {
                person: "Sophia Lee",
                Strengthsandweaknesses: "Good",
                rating: "4.0",
                OverallDecision: "2025-03-11",
                feedback: "Great JavaScript knowledge"
            },
            tech2: {
                person: "Ethan Hall",
                Strengthsandweaknesses: "Poor",
                rating: "2.5",
                OverallDecision: "2025-03-13",
                feedback: "Weak TypeScript fundamentals"
            },
            tech3: {
                person: "Olivia White",
                Strengthsandweaknesses: "N/A",
                rating: "N/A",
                OverallDecision: "N/A",
                feedback: "Not evaluated"
            }
        },
        {
            name: "Emily Brown",
            email: "emily.b@example.com",
            phone: "9871234560",
            skills: ["Python", "Django", "PostgreSQL"],
            experience: "4 years",
            education: "B.Tech in IT",
            status: "Hired",
            count: 3,
            interviewers: [],
            tech1: {
                person: "Daniel Harris",
                Strengthsandweaknesses: "Good",
                rating: "4.1",
                OverallDecision: "Recommend",
                feedback: "Strong Django skills"
            },
            tech2: {
                person: "Charlotte Lewis",
                Strengthsandweaknesses: "Excellent",
                rating: "4.7",
                OverallDecision: "Recommend",
                feedback: "Great database handling"
            },
            tech3: {
                person: "James Walker",
                Strengthsandweaknesses: "N/A",
                rating: "4",
                OverallDecision: "Excellent",
                feedback: "Not evaluated"
            }
        },
        {
            name: "Robert Wilson",
            email: "robert.w@example.com",
            phone: "9543217890",
            skills: ["Angular", "Node.js", "Express"],
            experience: "3 years",
            education: "B.Sc in Computer Science",
            status: "Rejected",
            count: 3,
            interviewers: [],
            tech1: {
                person: "Lucas Green",
                Strengthsandweaknesses: "Average",
                rating: "3.5",
                OverallDecision: "Recommend",
                feedback: "Decent Angular understanding"
            },
            tech2: {
                person: "Mia Taylor",
                Strengthsandweaknesses: "Good",
                rating: "4.3",
                OverallDecision: "Recommend",
                feedback: "Solid Express.js skills"
            },
            tech3: {
                person: "Benjamin Adams",
                Strengthsandweaknesses: "Poor",
                rating: "2.8",
                OverallDecision: "Not Recommend",
                feedback: "Needs work on backend optimizations"
            }
        },
        {
            name: "Sophia Martinez",
            email: "sophia.m@example.com",
            phone: "9321678450",
            skills: ["Vue.js", "Nuxt.js", "Firebase"],
            experience: "2 years",
            education: "MCA",
            status: "Hired",
            count: 3,
            interviewers: [],
            tech1: {
                person: "Henry King",
                Strengthsandweaknesses: "Good",
                rating: "4.2",
                OverallDecision: "Recommend",
                feedback: "Great Vue.js knowledge"
            },
            tech2: {
                person: "Ava Scott",
                Strengthsandweaknesses: "Excellent",
                rating: "4.8",
                OverallDecision: "Recommend",
                feedback: "Strong Firebase expertise"
            },
            tech3: {
                person: "William Reed",
                Strengthsandweaknesses: "Good",
                rating: "4.0",
                OverallDecision: "Recommend",
                feedback: "Solid full-stack capabilities"
            }
        }
    ])
    
    // Now you can use this `data` object as needed in your JavaScript application
    // console.log(data);
    
      
    return(
        <Dataprovider.Provider value={{forms:[form,setform],datas:[data,setdata],ids:[id,setid],userdets:[userdet,setuserdet]}}>
            {children}
        </Dataprovider.Provider>
    )
}
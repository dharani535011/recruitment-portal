import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Dataprovider=createContext()
export const Contextprovider=({children})=>{
    const [form,setform]=useState(false)
    const [id,setid]=useState("")
    const [userdet,setuserdet]=useState(false)
    const [data,setdata]= useState([])
    const [reloader,setReloader]=useState(false)
    useEffect(()=>{
      const fetchData=async ()=>{
        const res=await axios.get("https://recruitmentportalbackend.onrender.com/applicant/allapplicants")
        setdata(res.data.message)
      }
      fetchData()
    },[reloader])
    
  
    
      
    return(
        <Dataprovider.Provider value={{reloaders:[reloader,setReloader],forms:[form,setform],datas:[data,setdata],ids:[id,setid],userdets:[userdet,setuserdet]}}>
            {children}
        </Dataprovider.Provider>
    )
}


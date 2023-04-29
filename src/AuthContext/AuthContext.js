
import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export let AuthContext = createContext(null);

export default function AuthContextProvider (props){
     //useState
  const [saveData, setSaveData] = useState(null)
  //Local storage
  let saveUserData =()=>{
    let encodeToken = localStorage.getItem('token');
    let decodeTokent = jwtDecode(encodeToken);
    setSaveData(decodeTokent); //Data is full
  }
  //useEffect
  useEffect(() => {
  if (localStorage.getItem('token')) {
    saveUserData();
   
  }
  }, [])
  
  let logout = ()=>{
     localStorage.removeItem('token');
    setSaveData(null);
    return <Navigate to='login'/>
  
  }
    
    return <AuthContext.Provider value={{saveData,saveUserData,logout}}>
    {props.children}
    </AuthContext.Provider>
};


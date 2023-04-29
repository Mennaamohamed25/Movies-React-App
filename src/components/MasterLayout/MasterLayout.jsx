import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";

export default function MasterLayout({saveData,logout}) {
  return (
    <>
    <Navbar saveData={saveData} logout={logout}/>
  <div className="container">
  <Outlet/>
  </div>
    </>
  )
}

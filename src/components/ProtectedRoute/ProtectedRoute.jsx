import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({saveData , children}) {
    if ((saveData==null)& (localStorage.getItem('token')==null)) {
        return <Navigate to="/login"/>;
    }
  else {
    return children;
  }
}
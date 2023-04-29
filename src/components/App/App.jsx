import React, { useContext } from 'react';
import {   createHashRouter,  RouterProvider } from 'react-router-dom';
import Home from "../Home/Home";
import About from "../About/About";
import TvShowes from "../TvShowes/TvShowes";
import Register from "../Register/Register";
import People from "../People/People";
import Movies from "../Movies/Movies";
import Login from "../Login/Login";
import Notfound from "../Notfound/Notfound";
import MasterLayout from "../MasterLayout/MasterLayout";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Details from "../Details/Details";
import { AuthContext } from '../../AuthContext/AuthContext';
// import { Offline, Online } from "react-detect-offline";

function App() {
let {saveData,saveUserData,logout} = useContext(AuthContext)

//ROUTING
  let routes = createHashRouter([
    {
      path: "/",
      element: <MasterLayout saveData={saveData} logout={logout}/>,
      errorElement: <Notfound />,
      children: [
        { index: true, element:<ProtectedRoute saveData={saveData}><Home /></ProtectedRoute>  },
        { path: "about", element: <ProtectedRoute saveData={saveData}><About /></ProtectedRoute> },
        { path: "movies", element:<ProtectedRoute saveData={saveData}><Movies /></ProtectedRoute>  },
        { path: "tvShowes", element:<ProtectedRoute saveData={saveData}><TvShowes /></ProtectedRoute>   },
        { path: "people", element:<ProtectedRoute saveData={saveData}><People /></ProtectedRoute>   },
        { path: 'details/:id/:mediaType', element:<ProtectedRoute saveData={saveData}><Details /></ProtectedRoute>   },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveUserData={saveUserData}/> },
      ],
    },
  ]);

  return (
    <div>
       {/* <Online> </Online> */}
    {/* <Offline>You are offline</Offline> */}
    <RouterProvider router={routes} />
    </div>
  );
}

export default App;
/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reusable/Loading";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const {user,loading} = useContext(AuthContext)
  const { pathname } = useLocation();


  if (loading) {
    return <Loading />;
}

if (!loading && !user?.email) {
  return <Navigate to='/login' state={{ path: pathname }} />;
}


  if(!user?.isVerified && !loading){
    toast.warn('please check Your inbox to verify your Email address')
    window.location.href='/'
    
    // return <Navigate to='/' state={{ path: pathname }} />;
  }


  return children;
};

export default PrivateRoute;

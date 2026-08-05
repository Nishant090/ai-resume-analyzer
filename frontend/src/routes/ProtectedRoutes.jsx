import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";


function ProtectedRoutes({children}){
    const {isAuthenticated,loading} = useAuth()
 
    if(loading){
        return <h1>Loading.......</h1>
    }
    if(!isAuthenticated){
   
    return <Navigate to="/login" replace/>
   
    }
    return children
}

export default ProtectedRoutes
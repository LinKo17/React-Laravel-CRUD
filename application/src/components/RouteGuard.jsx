import {Navigate} from "react-router-dom"
function RouteGuard({children}){
    let token = localStorage.getItem("token")
    if(!token){
        return <Navigate to="/sign_in"/>
    }else{
        return children

    }
}
export default RouteGuard
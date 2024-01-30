import {Navigate} from "react-router-dom"
function RouteGuard({token,children}){
    if(!token){
        return <Navigate to="/sign_in"/>
    }else{
        return children

    }
}
export default RouteGuard
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Nav() {
    let navigate = useNavigate();

    let userObj = JSON.parse(localStorage.getItem("user"))

    function deleteFun() {
        fetch("http://localhost:8000/api/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg == "success") {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    navigate("/sign_in")
                }
            })
            .catch(error => console.log(error))
    }


    return (
        <>
            <div className="navbar bg-primary  navbar-expand navbar-dark text-danger">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <span className="text-warning" style={{
                            fontWeight:"900"
                        }}>STU_LIST</span>
                    </Link>
                    <ul className="navbar-nav">

                        {/* <li className="list-item">
                            <Link to="/" className="nav-link  active">
                                Home</Link>
                        </li> */}


                        {localStorage.getItem("token") ?
                            <li className="list-item dropdown">

                                <Link href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">{userObj.name}</Link>

                                <div className="dropdown-menu dropdown-menu-end">

                                    <Link to="/profile" className="dropdown-item text-center">
                                        Profile</Link>

                                    <Link to="" className="dropdown-item text-center" onClick={deleteFun}>logout</Link>
                                </div>
                            </li>
                            :

                            <li className="list-item dropdown">

                                <Link href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">Register</Link>

                                <div className="dropdown-menu  dropdown-menu-end">
                                    <Link to="/sign_up" className="dropdown-item text-center">Sign Up</Link>
                                    <Link to="/sign_in" className="dropdown-item text-center">Sign In</Link>
                                </div>
                            </li>
                        }



                    </ul>
                </div>
            </div>
            <Outlet />
        </>
    )
}
export default Nav;
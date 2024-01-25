import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <>
            <div className="navbar bg-primary  navbar-expand navbar-dark text-danger">
                <div className="container">
                    <Link to="/" className="navbar-brand">Lincoln</Link>
                    <ul className="navbar-nav">
                        <li className="list-item">
                            <Link to="/" className="nav-link  active">
                                Home</Link>
                        </li>
                        <li className="list-item">
                            <Link to="/profile" className="nav-link active">
                                Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </>
    )
}
export default Nav;
import useCustom from "../customHook";
import { useDispatch, useSelector } from "react-redux";
import actionObj from "../redux/studentAction";
import msgObj from "../redux/messageAction";
import { Link } from "react-router-dom";
import "../app.css"

function Home() {
    let { load } = useCustom("http://localhost:8000/api/students")
    let students = useSelector(state => state.students);

    //delete section
    let dispatch = useDispatch();
    let { removeUser } = actionObj
    let msg = useSelector(msg => msg.msg)

    let { deleteFine } = msgObj

    return (
        <>
            {load ?
                <div className="container mt-3">
                    <div className="container_Inner">
                    <h1 className="text-center fs-2 bg-dark text-light p-2">STUDENT LIST</h1>

                    <span className="text-success my-2">{msg}</span>
                    <table className="table table-striped  table-hover table-bordered">

                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Class</th>
                                <th className="register">Registed by</th>
                                <th className="date">Date</th>
                                <th className="action">Action</th>
                            </tr>
                        </thead>

                        {students.map((element, index) => {
                            return (
                                <tbody key={element.id}>

                                    <tr>
                                        <td>{element.id}</td>

                                        <td style={{
                                            wordBreak:"break-all",
                                            wordWrap:"break-word"
                                        }}>{element.name}</td>

                                        <td>{element.phone}</td>

                                        <td>{element.class}</td>
                                        
                                        <td className="register">{element.registed_by}</td>
                                        <td className="date">{element.created_at.split('T')[0]}</td>
                                        <td className="action">
                                            <div className="btn-group">

                                                <Link to={"/edit/" + element.id} className="btn btn-outline-primary">
                                                    Edit
                                                </Link>

                                                <button onClick={() => {
                                                    if (window.confirm("Are you Sure?")) {
                                                        dispatch(removeUser(element))
                                                        // -------
                                                        fetch(`http://localhost:8000/api/students/${element.id}`, {
                                                            method: "DELETE",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                                                            }
                                                        })
                                                            .then(response => response.json())
                                                            .then(msg => dispatch(deleteFine("* You delete a student! ")))
                                                            .catch(error => console.log(error))
                                                        // -------
                                                    }
                                                }} className="btn btn-outline-danger">
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}

                    </table>

                    </div>
                </div>
                :
                <div className="d-flex justify-content-center border align-items-center" style={{
                    height: "100vh"
                }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }



        </>
    )

}
export default Home;
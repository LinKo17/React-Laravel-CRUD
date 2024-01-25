import { useSelector } from "react-redux";
function Home() {
    let student= useSelector(state =>state.students)
    console.log(student)
    return (
        <>
            <div className="container mt-3">
                <h1 className="text-center fs-2 bg-dark text-light p-2">STUDENT LIST</h1>

                <table className="table table-striped  table-hover table-bordered">

                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Class</th>
                            <th>Registed by</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1.</td>
                            <td>Bob</td>
                            <td>09753278238</td>
                            <td>class-1</td>
                            <td>Teacher Su</td>
                            <td>22.2.24</td>
                            <td>
                                <div className="btn-group">
                                    <button className="btn btn-outline-success">Detail</button>
                                    <button className="btn btn-outline-primary">
                                        Edit
                                    </button>
                                    <button className="btn btn-outline-danger">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </>
    )
}
export default Home;
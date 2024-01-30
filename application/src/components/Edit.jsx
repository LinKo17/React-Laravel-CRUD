import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../app.css"
import { useDispatch } from "react-redux"
import actionObj from "../redux/studentAction"
function Edit() {
    let { id } = useParams()

    let [nameValue, setNameValue] = useState("")
    let [phoneValue, setPhoneValue] = useState("")
    let [classValue, setClassValue] = useState("")
    let [idValue, setIdValue] = useState("")
    let [arriveData, setArriveData] = useState(false)
    let [checkError, setCheckError] = useState(false)

    //error message
    let [nameEr,setNameEr] = useState("")
    let [phoneEr,setPhoneEr] = useState("")
    let [classEr,setClassEr] = useState("")

    let userObj = JSON.parse(localStorage.getItem("user"))

    let navigate = useNavigate()
    
    
    let dispatch = useDispatch()
    let {editUser} = actionObj
    // -----------------------------detail
    useEffect(() => {
        fetch(`http://localhost:8000/api/students/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data.msg)
                if (data.msg == "no error") {
                    setIdValue(data.student.id)
                    setNameValue(data.student.name)
                    setPhoneValue(data.student.phone)
                    setClassValue(data.student.class)
                    setArriveData(true)
                } else {
                    setCheckError(true)
                }
            })
            .catch(error => console.log(error))
    }, [])
    // -----------------------------

    function editFromHandler(e) {
        e.preventDefault();
        // console.log(idValue)
        // console.log(nameValue)
        // console.log(phoneValue)
        // console.log(classValue)

        fetch(`http://localhost:8000/api/students/${idValue}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body : JSON.stringify({
                name : nameValue,
                phone : phoneValue,
                class : classValue,
                register:userObj.name
            })
        })
        .then((response) => response.json())
        .then(message => {
            // --------------------------
                // console.log(message.student)


                if(message.msg === "edit success"){
                    dispatch(editUser(message.student))
                    navigate("/")
                }else{


                    function formValidation($main,$set){
                        if($main == undefined){
                            $set("")
                        }else{
                            $set($main[0])
                        }
                    }
                    formValidation(message.error.name, setNameEr)
                    formValidation(message.error.phone,setPhoneEr)
                    formValidation(message.error.class,setClassEr)
                }
            // --------------------------
        })
        .catch(error => console.log(error))


    }


    return (
        <>
            {arriveData ?
                <div className="container mt-2 container_width">
                    <h1 className="text-center fs-2 bg-dark text-light p-2">Edit Student</h1>

                    <form className="border rounded p-2" onSubmit={editFromHandler}>
                        <input type="text"
                            className="form-control my-2"
                            placeholder="name"
                            value={nameValue}
                            onChange={(e) => {
                                setNameValue(e.target.value)
                            }}
                            required
                        />
                        <span className="text-danger">{nameEr}</span>

                        <input type="text"
                            className="form-control my-2"
                            placeholder="phone"
                            value={phoneValue}
                            onChange={(e) => {
                                setPhoneValue(e.target.value)
                            }}
                            required
                        />
                        <span className="text-danger">{phoneEr}</span>

                        <input type="text"
                            className="form-control my-2"
                            placeholder="class"
                            value={classValue}
                            onChange={(e) => {
                                setClassValue(e.target.value)
                            }}
                            required
                        />
                        <span className="text-danger">{classEr}</span>

                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
                :

                <>
                    {checkError ?

                        <div className="d-flex justify-content-center border align-items-center" style={{
                            height: "100vh"
                        }}>

                            <h1>404 Not found</h1>
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
            }
        </>
    )
}
export default Edit
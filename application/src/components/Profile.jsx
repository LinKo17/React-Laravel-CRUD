import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import actionObj from "../redux/studentAction"
import msgObj from "../redux/messageAction"
import { useNavigate } from "react-router-dom"

import "../app.css"
function Profile() {
    let [addName, addPhone, addClass] = [useRef(""), useRef(""), useRef("")];

    let [nameEr,setNameEr] = useState("")
    let [phoneEr,setPhoneEr] = useState("")
    let [classEr,setClassEr] = useState("")


    let dispatch = useDispatch()
    let { addUser } = actionObj
    let navigate = useNavigate()

    let {addFine} = msgObj

    let userObj = JSON.parse(localStorage.getItem("user"))

    function formHandler(e) {
        e.preventDefault()
        

        
        let student = {
            "name": addName.current.value,
            "phone": addPhone.current.value,
            "class": addClass.current.value,
        }

        fetch("http://localhost:8000/api/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: student.name,
                phone: student.phone,
                class: student.class,
                register:userObj.name
            })
        })
            .then(response => response.json())
            .then(message => {
                // console.log(message)
                if(message.msg == "success"){
                    console.log(message.msg)
                    dispatch(addUser(message.student))
                    dispatch(addFine("* Student is successfully add!"))
                    navigate("/")
                }else{
                    // console.log(message.error_message)
            

                    function formValidation($main,$set){
                        if($main == undefined){
                            $set("")
                        }else{
                            $set($main[0])
                        }
                    }
                    formValidation(message.error_message.name, setNameEr)
                    formValidation(message.error_message.phone,setPhoneEr)
                    formValidation(message.error_message.class,setClassEr)

                }
            })
            .catch(error => console.log(error))

        // console.log(student)
        addName.current.value = ""
        addPhone.current.value = ""
        addClass.current.value = ""

    }
   

    return (
        <div className="container container_width">
            <img src="" alt="" />
            <h5>{userObj.name}</h5>
            <p>email : {userObj.email}</p>


            <form onSubmit={formHandler} className="border rounded p-2">
                <input type="text"
                    className="form-control my-2"
                    placeholder="name"
                    ref={addName}
                    required
                />
                <span className="text-danger" id="name"> {nameEr}</span>

                <input type="text"
                    className="form-control my-2"
                    placeholder="phone"
                    ref={addPhone}
                    required
                />
                <span className="text-danger" id="phone"> {phoneEr}</span>

                <input type="text"
                    className="form-control my-2"
                    placeholder="class"
                    ref={addClass}
                    required
                />
                <span className="text-danger" id="class"> {classEr}</span>


                <div className="mt-2">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}
export default Profile;
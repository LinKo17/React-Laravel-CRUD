import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
function SignIn(){
    let  email = useRef("")
    let  password = useRef("")
    let navigator = useNavigate()

    let [emailErr,setEmailErr] = useState("")
    let [passwordErr,setPasswordErr] = useState("")



    function formHandler(e){
        e.preventDefault();
        let emailValue =email.current.value
        let passwordValue =password.current.value


        fetch(`http://localhost:8000/api/login`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email : emailValue,
                password: passwordValue
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.msg == "fine"){
                localStorage.setItem("token",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                navigator("/")
            }else{
                // console.log(data.error);
                if(data.exit != "fail") {
                    setEmailErr(data.error.email)
                    setPasswordErr(data.error.password)
                }else{
                    setEmailErr("email not found")
                    setPasswordErr("")
                    password.current.value = ""
                }
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="container mt-3" style={{
            maxWidth : "400px"
           }}>

           <form  className="border p-3 rounded" onSubmit={formHandler}>
            <h1 className="mb-4">Sign In</h1>

            <input type="email"
             className="form-control my-2"
             placeholder="email"
             ref={email}
             required
             />
            <span className="text-danger">{emailErr}</span>

            <input type="password"
             className="form-control my-2"
             placeholder="password"
             ref={password}
             required
             />
             <span className="text-danger">{passwordErr}</span>

            <div className="mt-2">
             <button className="btn btn-success">Sign In</button>
            </div>

           </form>
        </div>
    )
}

export default SignIn
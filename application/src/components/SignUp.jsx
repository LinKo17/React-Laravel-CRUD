import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
function SignUp() {
    let name = useRef("")
    let email = useRef("")
    let password = useRef("")
    let conpassword = useRef("")

    let [nameEr, setNameEr] = useState("")
    let [emailEr, setEmailEr] = useState("")
    let [passwordEr, setPasswordEr] = useState("")
    let [conpasswordEr, setConPasswordEr] = useState("")

    let navigate = useNavigate()
    
    function formHandler(e) {
        e.preventDefault();
        // -------------------------------------------
        fetch(`http://localhost:8000/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                conpassword: conpassword.current.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg == "success") {
                    localStorage.setItem("token",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    navigate("/")
                    name.current.value = ""
                    email.current.value = ""
                    password.current.value = ""
                    conpassword.current.value = ""


                } else {
                    setNameEr(data.error.name)
                    setEmailEr(data.error.email)
                    setPasswordEr(data.error.password)
                    setConPasswordEr(data.error.conpassword)
                    password.current.value = ""
                    conpassword.current.value = ""
                }
            })
            .catch(error => console.log(error))
        // -------------------------------------------
    }
    return (
        <div className="container mt-3" style={{
            maxWidth: "400px"
        }}>

            <form action="" className="border p-3 rounded" onSubmit={formHandler}>
                <h1 className="mb-4">Sign Up</h1>

                <input type="name"
                    className="form-control my-2"
                    placeholder="name"
                    ref={name}
                    required
                />
                <span className="text-danger">{nameEr}</span>

                <input type="email"
                    className="form-control my-2"
                    placeholder="email"
                    ref={email}
                    required
                />
                <span className="text-danger">{emailEr}</span>

                <input type="password"
                    className="form-control my-2"
                    placeholder="password"
                    ref={password}
                    required
                />
                <span className="text-danger">{passwordEr}</span>

                <input type="password"
                    className="form-control my-2"
                    placeholder="confirm password"
                    ref={conpassword}
                    required
                />
                <span className="text-danger">{conpasswordEr}</span>

                <div className="mt-3">
                    <button className="btn btn-success">Sign Up</button>
                </div>

            </form>
        </div>
    )
}

export default SignUp
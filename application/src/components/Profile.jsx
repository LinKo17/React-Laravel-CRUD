import { useRef } from "react";
function Profile(props) {
    let addName = useRef("")
    let addPhone = useRef("")
    let addClass = useRef("")

    function formHandler(e){
        e.preventDefault()
        let student = {
            "name" : addName.current.value,
            "phone" : addPhone.current.value,
            "class" : addClass.current.value,
        }
        console.log(student)
        addName.current.value = ""
        addPhone.current.value = ""
        addClass.current.value = ""
    }
    return (
        <div className="container">
            <img src="" alt="" />
            <h5>name</h5>
            <p>test@gmail.com</p>


            <form onSubmit={formHandler} className="border rounded p-2">
                <input type="text"
                    className="form-control my-2"
                    placeholder="name"
                    ref={addName}
                />

                <input type="text"
                    className="form-control my-2"
                    placeholder="phone"
                    ref={addPhone}
                />

                <input type="text"
                    className="form-control my-2"
                    placeholder="class"
                    ref={addClass}
                />

                <div className="m-auto">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}
export default Profile;
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import actionObj from "./redux/studentAction"
import { useNavigate } from "react-router-dom"

const useCustom = ($path, $adding) => {

    let [load, setLoad] = useState(false)
    let { addUser, removeUser } = actionObj
    let dispatch = useDispatch()

    let useRen = useRef(false)

    let studentsLegth = useSelector(state => state.students)

    let navigate = useNavigate()
    useEffect(()=>{
        if(studentsLegth.length != 0 ){
            setLoad(true)
        }
    },[])


    useEffect(() => {
        if (useRen.current == false && studentsLegth.length === 0) {
            fetch($path, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Not Fine")
                    }
                    return response.json();
                })
                .then(data => {
                    // console.log(data.students)
                    data.students.map(element => dispatch(addUser(element)))
                    setLoad(true)
                })
                .catch(error => {
                    if(error.message == "NetworkError when attempting to fetch resource."){
                        localStorage.removeItem("token")
                        navigate("/sign_in")
                    }
                })
        }


        return () => useRen.current = true

    }, [studentsLegth])

    return { load }
}

export default useCustom;

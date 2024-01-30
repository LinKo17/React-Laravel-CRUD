let addUser = (add) =>{
    return {
        type : "ADD",
        payload : add,
    }
}

let removeUser = (remove) =>{
    return {
        type : "REMOVE",
        payload : remove
    }
}

let editUser = (edit) =>{
    return {
        type : "Edit",
        payload : edit
    }
}


const actionObj = {
    addUser,
    removeUser,
    editUser
}
export default actionObj
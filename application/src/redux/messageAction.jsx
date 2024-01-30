let addFine = (addFine) => {
    return {
        type :"AddFine",
        payload : addFine
    }
}

let deleteFine = (deleteFine) =>{
    return {
        type:"DeleteFine",
        payload:deleteFine
    }
}

const msgObj = {
    addFine,
    deleteFine
}

export default msgObj;
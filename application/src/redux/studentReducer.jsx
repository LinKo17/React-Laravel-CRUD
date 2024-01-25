import {combineReducers} from "redux"

let studentReducer = (state = [],{type,payload}) =>{
    switch(type){
        case "ADD":
            return [...state,payload]
        default :
            return state;
    }
}

const reducers = combineReducers({
    students : studentReducer
})

export default reducers
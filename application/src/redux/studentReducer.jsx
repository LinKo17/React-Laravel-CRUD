import { combineReducers } from "redux"
let studentReducer = (state = [], { type, payload }) => {
    switch (type) {
        case "ADD":
            return [...state,payload]
        case "Edit":
            return state.map(element => (element.id === payload.id ? payload : element));
        case "REMOVE":
            return state.filter((element) => element.id != payload.id);
        default:
            return state;
    }
}

const messageReducer = (state = "", { type, payload }) => {
    switch (type) {
        case "AddFine":
            return payload;
        case "DeleteFine":
            return payload;
        default:
            return state;
    }
}

const reducers = combineReducers({
    students: studentReducer,
    msg: messageReducer
})

export default reducers
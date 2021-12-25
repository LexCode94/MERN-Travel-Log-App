import { LOGIN, LOGOUT } from "../actions"

const initialState = () => {
    if(localStorage.getItem('token')){
        return true
    } else {
        return false
    }
}


const loginReducer = (state=initialState(), action) => {

    switch(action.type){
        case LOGIN:
            state = true
            return state
        case LOGOUT:
            state = false
            return state
        default:
            return state
    }
}

export default loginReducer;
import { SET_TRAVELS } from "../actions";

const travelsReducer = (state=[], action) => {
    switch(action.type){
        case SET_TRAVELS:
            state = action.payload
            return state
        default: 
        return state
    }
}

export default travelsReducer;
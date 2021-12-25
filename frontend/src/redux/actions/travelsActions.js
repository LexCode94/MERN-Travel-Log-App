import { SET_TRAVELS } from "."

export const setTravels = (travels) => {
    return {
        type: SET_TRAVELS,
        payload: travels
    }
}
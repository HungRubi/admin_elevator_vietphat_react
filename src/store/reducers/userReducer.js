import actionTypes from "../actions/actionTypes";

const initState = {
    currentUser: null,
}

const userReducer = (state=initState, action) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_USER: 
            return {
                ...state,
                currentUser: action.user
            }

        case actionTypes.LOGOUT:
            return {
                ...state,
                currentUser: null,
            }
        
        default:
            return state;
    }
    
}

export default userReducer
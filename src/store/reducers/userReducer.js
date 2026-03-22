import actionTypes from "../actions/actionTypes";

const initState = {
    currentUser: null,
    accessToken: null,
}

const userReducer = (state=initState, action) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_USER: 
            return {
                ...state,
                currentUser: action.user
            }

        case actionTypes.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.accessToken || null,
            }

        case actionTypes.LOGOUT:
            return {
                ...state,
                currentUser: null,
                accessToken: null,
            }
        
        default:
            return state;
    }
    
}

export default userReducer
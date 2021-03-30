//initial state
const initialState ={
    username: '',
    profile_pic: ''
};

//action types
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

//action creators

export function updateUser(user){
    console.log(user)
    return {
        type: UPDATE_USER,
        payload: user
    }
}

// export const updateUser = (username, profile_pic) => {

//     console.log('hit')
//     const action = {

//         type: UPDATE_USER,
//         payload: {username, profile_pic}
//     }
//     return action 
// };

export const logout = (username) => {
    return {
        type: LOGOUT,
        payload: {username}
    }
}


//reducer function
export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER:
            return{
                ...state,
                username: action.payload.username,
                profile_pic: action.payload.profile_pic
            }
        case LOGOUT:
            return initialState
        default: return state;
    }
}


// const reducer = (state = initialState, action) => {
//     switch(action.type){
//         case UPDATE_USER:
//             return {...state, ...action.payload}
//         case LOGOUT: 
//             return {...state, username: '', profile_pic: ''}
//         default:
//             return state;
//     }
// };

// export default reducer;
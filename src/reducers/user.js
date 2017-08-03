export default (state = {},action = {}) => {
    switch(action.type){
        case "SET_USER":
            return{
                ...state,
                userInfo:action.userInfo
            }
        default:
            return state
    }
}
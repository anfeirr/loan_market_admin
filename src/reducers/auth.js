export default (state = {},action = {}) => {
    switch(action.type){
        case "SET_INFO":
            return{
                ...state,
                userInfo:action.userInfo
            }
        default:
            return state
    }
}
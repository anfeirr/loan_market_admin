
export default (state = {},action = {}) => {
    switch(action.type){
        case "SET_USERLIST_OF_LIST":
            return {
                ...state,
                data:action.data
            }
        default:
            return state
    }
}



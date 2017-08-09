export default (state = {},action = {}) => {
    switch(action.type){
        case "SET_COUNTDATA":
            return{
                ...state,
                data:action.data
            }
        default:
            return state
    }
}





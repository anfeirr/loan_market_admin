export default (state = {},action = {}) => {
    switch(action.type){
        case "SET_LIST":
            return{
                ...state,
                listInfo:action.list
            };
        default:
            return state
    }
}
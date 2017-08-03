import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import user from './user'
import list from  './list'
export default combineReducers({
    auth,
    user,
    list,
    router: routerReducer
})

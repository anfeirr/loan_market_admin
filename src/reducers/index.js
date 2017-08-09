import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import user from './user'
import list from  './list'
import count from './count'
import userlist from './userlist'

export default combineReducers({
    auth,
    user,
    list,
    count,
    userlist,
    router: routerReducer
})

import React from 'react'
import { Route } from 'react-router'
import Users  from './containers/Users'
import Login from './containers/Login'
import Lists from './containers/Lists'
import Admin from './containers/Admin'
export default (
    <div>
        <Route  exact path="/" component={Users}/>
        <Route path="/login" component={Login}/>
        <Route path="/lists/:id" component={Lists}/>
        <Route path="/admin/:type/:value" component={Admin}/>
    </div>
)
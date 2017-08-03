import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { Router } from 'react-router-dom'

import reducers from './reducers'
import routes from './routes'

import './index.css'

const history = createHistory();

const loggerMiddleware = createLogger();
const store = createStore(
    reducers,
    compose(
        applyMiddleware(
            thunkMiddleware,    // 允许我们 dispatch() 函数
            loggerMiddleware    // 打印 action 日志
        ),
    )
);
//
// if (sessionStorage.jwtToken) {
//
//     setAuthorizationToken(sessionStorage.jwtToken);
//
//     store.dispatch(setCurrentUser(jwtDecode(sessionStorage.jwtToken)));
//
// }


let rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    rootElement
)
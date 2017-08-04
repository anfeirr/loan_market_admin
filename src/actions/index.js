import axios from 'axios'


export function setUser(userInfo){
    return {
        type:'SET_USER',
        userInfo
    }
}


export function getUser(){
    return dispatch => {
        axios.get('/admin/api/user').then(res => {
            dispatch(setUser(res))
        })
    }
}

export function setList(list){
    return {
        type:'SET_LIST',
        list
    }
}

export function getList(){
    return dispatch => {
        axios.get('/admin/api/list').then(res => {
                console.log(res)
                dispatch(setList(res))
        })
    }
}

export function setForm (data){
    return dispatch => {
        axios.post('/admin/api/getform',data).then(res => {
            console.log(res)
        })
    }
}
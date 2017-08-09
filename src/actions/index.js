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

export function deleteById(id){
    return dispatch => {
      axios.post('/admin/api/delete',{id:id}).then( res => {
            console.log("删除返回请求"+res)
      })
    }
}

export function setCountData(data){
        return {
            type:"SET_COUNTDATA",
            data
        }
}
export function setUserListOfList(data){
        return {
            type:"SET_USERLIST_OF_LIST",
            data
        }
}

export function getCountDataByList(value){
    return dispatch => {
        axios.post('/admin/api/getcountdatabylist',{value:value}).then(res => {
            console.log('计数返回请求',res)
            dispatch(setCountData(res))
        })
    }
}

export function getCountDataByUser(phoneNumber){
    return dispatch => {
        axios.post('/admin/api/getusercount').then(res => {
            dispatch(setCountData(res))
        })
    }
}

export function getListsCount(){
    return dispatch => {
        axios.post('/admin/api/getlistcount').then(res => {
            dispatch(setCountData(res))
        })
    }
}

export function getnameList(id){
    return dispatch => {
        axios.post('/admin/api/getnamelist',{listId:id}).then(res => {
            console.log("获取用户列表为：",res)
            dispatch(setUserListOfList(res));
        })
    }
}
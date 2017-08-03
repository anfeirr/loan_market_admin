import user from "../../../src/reducers/user";

var userArr = []

module.exports = function(router,body,connection){

    connection.query(`select * from user_base_info`,function(err,result){

        setInterval(updateUser(connection),1000);
        router.get(`/admin/api/user`,body,function(ctx){
            console.log(userArr)
            ctx.body = JSON.stringify(userArr) == '[]'?result:userArr;
        })
    })

}



function updateUser (connection){
    return function(){
        connection.query(`select * from user_base_info`,function(err,result){
            userArr = result
        })
    }

}
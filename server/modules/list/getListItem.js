module.exports = function(router,body,connection){
     // connection.query(`select * from loan_list where id=`)
    router.get('/api/admin/img',body,ctx => {
        console.log(ctx)
    })
}
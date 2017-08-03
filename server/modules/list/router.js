var sql = []

module.exports = function (router,body,connection){

    connection.query(`select * from loan_list`,function(err,result) {
        connection.query(`select * from loan_list_tags`,function(tagerr,tagResult){

            router.get('/admin/api/list/', body, ctx => {
                setInterval(updateSql(connection),1000)


                result.map((item,index) => {
                    //把数据库存的tags转换成数组

                    if(!Array.isArray(item.tag)){
                        item.tag =  item.tag.split('T');
                        item.tag.shift()
                    }

                    //把数组对应id转换成对应字符串
                    for(let i = 0; i < item.tag.length;i++){
                        for(let j = 0; j < tagResult.length;j++){

                            if(item.tag[i] == tagResult[j].id){
                                item.tag[i] = tagResult[j].tag;
                            }
                        }
                    }

                });

                ctx.body = JSON.stringify(sql) == '[]' ? result:sql;
            })
        })
    });


};

function updateSql(connection){
    return function (){
        connection.query(`select * from loan_list`,function(err,result) {
            connection.query(`select * from loan_list_tags`,function(tagerr,tagResult){


                result.map((item,index) => {
                    //把数据库存的tags转换成数组

                    if(!Array.isArray(item.tag)){
                        item.tag =  item.tag.split('T')
                        item.tag.shift()
                    }

                    //把数组对应id转换成对应字符串
                    for(let i = 0; i < item.tag.length;i++){
                        for(let j = 0; j < tagResult.length;j++){

                            if(item.tag[i] == tagResult[j].id){
                                item.tag[i] = tagResult[j].tag;
                            }
                        }
                    }

                });


                sql = result;

            })
        })
    }
};


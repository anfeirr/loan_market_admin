var countData = [];
var listData = [];
var countPhoneNumber = [];
var countListNumber = [];
var nameList = [];

module.exports = function(router,body,connection){

        setInterval(updateCount(connection),1000);

        connection.query(`select time,phoneNumber,listId from loan_list_count`,
            function(err,result){

                router.post('/admin/api/getcountdatabylist',body, ctx => {
                    if(err){
                        ctx.body = []
                    }else{
                        // ctx.body = await result
                        let Result = countData == []?result:countData;

                        let MiddleResult =  Result.filter( (item,index) => {
                            return  item.listId  == ctx.request.body.value
                        });

                        if(MiddleResult.length){
                            let timeData = [];
                            let pushTag = true;
                            timeData.push({time:MiddleResult[0].time,count:0})

                            for (let i = 0; i < MiddleResult.length;i++){
                                pushTag = true
                                for (let j = 0; j < timeData.length;j++){

                                    if(MiddleResult[i].time == timeData[j].time){

                                        ++timeData[j].count
                                        pushTag = false
                                    }

                                }
                                if(pushTag){
                                    timeData.push({time:MiddleResult[i].time,count:1})

                                }

                            }
                            ctx.body = timeData
                        }else{
                            ctx.body = []

                        }
                    }

                })
                router.post('/admin/api/getcountdatabyuser',body, ctx => {
                    if(err){
                        ctx.body = []
                    }else {
                        let Result = countData == [] ? result : countData;
                        let MiddleResult = Result.filter((item, index) => {
                            return item.phoneNumber == ctx.request.body.phoneNumber
                        });
                        if (MiddleResult.length >= 1) {
                            let timeData = [];
                            let pushTag = true;
                            timeData.push({time: MiddleResult[0].time, listArr: []})

                            for (let i = 0; i < MiddleResult.length; i++) {
                                pushTag = true
                                for (let j = 0; j < timeData.length; j++) {

                                    if (MiddleResult[i].time == timeData[j].time) {
                                        timeData[j].listArr.push(MiddleResult[i].listId)
                                        pushTag = false
                                    }

                                }
                                if (pushTag) {
                                    timeData.push({time: MiddleResult[i].time, listArr: []})

                                }

                            }

                            ctx.body = timeData
                        } else {
                            ctx.body = "此人没有点击过任何东西"
                        }

                    }




                    // connection.query(`select name,id from loan_list`,function(listErr,listResult){
                    //     let listMiddleResult = listData == []?listResult:listData;
                    //     // console.log('查询的list信息',listData)
                    //
                    //     for(let i = 0; i < timeData.length;i++){
                    //
                    //         for(let j = 0; j < timeData[i].listArr.length;j++){
                    //
                    //             for(let k = 0; k < listMiddleResult.length;k++){
                    //
                    //                 if(timeData[i].listArr[j] == listMiddleResult[k].id){
                    //
                    //                     timeData[i].listArr[j] = listMiddleResult[k].name
                    //
                    //                 }
                    //             }
                    //         }
                    //     }
                    // });

                })

            });

        connection.query(`select count(*) as clickNumber,phoneNumber from loan_list_count group by phoneNumber`,
            function(err,result){

                router.post('/admin/api/getusercount',body ,ctx => {
                    if(err){
                        ctx.body = []
                    }else {
                        let Result = countPhoneNumber == [] ? result : countPhoneNumber;
                        ctx.body = Result
                    }
                })
            })

        connection.query(`select count(*) as listNumber,listId from loan_list_count group by listId`,
            function (err,result) {

                router.post('/admin/api/getlistcount',body ,ctx => {
                    if(err){
                        ctx.body = []
                    }else {
                        let Result = countListNumber == [] ? result : countListNumber;
                        ctx.body = Result
                    }
                })
            })

        connection.query(`select phoneNumber,listId from loan_list_count`,
            function(err,result){

            router.post('/admin/api/getnamelist',body,ctx => {
                if(err){
                    ctx.body = []
                }else {
                    let Result = nameList == [] ? result : nameList;

                    let dd = Result.filter(item => {

                        return item.listId == ctx.request.body.listId
                    });
                    ctx.body = dd;
                }
            })
            })
};




function updateCount(connection){
    return function(){
        connection.query(`select time,phoneNumber,listId from loan_list_count`,
            function(err,result){
                countData = result
            })
        connection.query(`select name,id from loan_list`,
            function(err,result){
                listData = result
            })
        connection.query(`select count(*) as clickNumber,phoneNumber from loan_list_count group by phoneNumber`,
            function(err,result){
               countPhoneNumber = result
            })
        connection.query(`select count(*) as listNumber,listId from loan_list_count group by listId`,
            function (err,result) {
                countListNumber = result
            })
        connection.query(`select phoneNumber,listId from loan_list_count`,
            function(err,result){
                    nameList = result
                })

    }
}
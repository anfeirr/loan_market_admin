import  officegen from 'officegen'
import fs from 'fs'
import path from 'path'
let userInfo = [];

 module.exports = function(router,body,connection) {
     connection.query(`select * from user_base_info `, (err, result) => {
         setInterval(updateUserInfo(connection),1000)
         router.post('/admin/api/xlsx', body, async ctx => {

             const xlsx = officegen('xlsx')
             const exportConf = ctx.request.body.data;
             let time = `${exportConf.Year}-${exportConf.Mouth}-${exportConf.Day}`;

             let MiddleResult = JSON.stringify(userInfo) == '[]' ? result:userInfo;
             let Result = MiddleResult.filter( item => {
                 return exportConf.Type == 1?item.end_time == time:item.start_time == time
             });

             xlsx.on('finalize', function (written) {
                 console.log('Finish to create an Excel file. Total bytes created: ' + written + '\n');
             });

             xlsx.on('error', function (err) {
                 console.log(err);
             });

             const sheet = xlsx.makeNewSheet();
             sheet.name = `${time}${exportConf.Type == 1?'最后':'最初'}登录用户信息列表`;
                sheet.data[0] = []
                sheet.data[0][0] = '姓名'
                sheet.data[0][1] = '手机号'
                sheet.data[0][2] = '联系人'
                sheet.data[0][3] = '公司地址'
                sheet.data[0][4] = '家庭住址'

             for(let i = 0; i < Result.length;i++){
                 sheet.data[i+1] = [];

                 sheet.data[i+1][0] = Result[i].userName;
                 sheet.data[i+1][1] = Result[i].phoneNumber;
                 sheet.data[i+1][2] = Result[i].personName;
                 sheet.data[i+1][3] = Result[i].work_address;
                 sheet.data[i+1][4] = Result[i].home_address;
             }

             var out = fs.createWriteStream(path.join(__dirname,'../../public/download/out.xlsx'));

             out.on('error', function (err) {
                 console.log(err);
             });

             xlsx.generate(out);
             ctx.body = "export success"

         })

     })


     function updateUserInfo(connection) {
         return function(){
             connection.query(`select * from user_base_info `, (err, result) => {
                 userInfo = result
             })
         }
         }
 }



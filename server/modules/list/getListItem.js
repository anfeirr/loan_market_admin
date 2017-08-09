const multer = require('koa-multer')
const path = require('path')


var imgurl = '',changeImg = false;

var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../public/uploads'))
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({ storage: storage });

module.exports = function(router,body,connection){

    router.post('/admin/api/delete',body, ctx => {
        connection.query(`select * from loan_list where id='${ctx.request.body.id}'`,(err,result) => {
            if(result.length){
                if(result[0].type == 1 || result[0].type == 2 || result[0].type == 3){
                    connection.query(`
                     update loan_list set type="${4}" where id="${ctx.request.body.id}"`,(err,result) => {
                        console.log(err,result);
                        ctx.body = result
                    })
                }else if(result[0].type == 4){
                    connection.query(`delete from loan_list where id='${ctx.request.body.id}'`,(err,result) => {
                        console.log(err,result);
                        ctx.body="delete ok"
                    })
                }
            }
        })

    });

    router.post('/upload', upload.single('files'), async (ctx, next) => {
        console.log(ctx.req.file)
        imgurl = ctx.req.file.filename
        changeImg = true
        ctx.body = {
            filename: ctx.req.file.filename//返回文件名
    }
    });


    router.post('/admin/api/getform',body,ctx => {

        console.log(ctx.request.body.id);

        connection.query(`select * from loan_list where id = ${ctx.request.body.id}`,function(err,result){

            connection.query(`select * from loan_list_tags`, function (tagErr,tagResult)  {

                let type = ctx.request.body.type == "小额贷款" || ctx.request.body.type == 'small' ? 1 :( ctx.request.body.type == "中额贷款" || ctx.request.body.type=="middle")? 2 : 3;
                console.log(ctx.request.body.type)
                let tag = ctx.request.body.tag

                for(let i = 0; i < tagResult.length; i++){
                    for (let j = 0; j < tag.length; j++){
                        if(tag[j] == tagResult[i].tag){
                            tag[j] = 'T' + tagResult[i].id
                        }
                    }
                }
                for (let i = 1; i < tag.length;i++){
                    tag[0] += tag[i]
                }

                if(result.length){
                     let upDateQuery =changeImg? `
                     update loan_list set
                      name="${ctx.request.body.name}",
                      time="${ctx.request.body.time}",
                      money="${ctx.request.body.money}",
                      type="${type}",
                      href="${ctx.request.body.url}",
                      tag="${tag[0]}",
                      icon="${imgurl}"
                      where id="${ctx.request.body.id}"
                      `:
                         `update loan_list set
                    name="${ctx.request.body.name}",
                        time="${ctx.request.body.time}",
                        money="${ctx.request.body.money}",
                        type="${type}",
                        href="${ctx.request.body.url}",
                        tag="${tag[0]}"
                    where id="${ctx.request.body.id}"
                        `;
                     changeImg = false

                     console.log(type)
                    connection.query(upDateQuery,function(err,result){
                        console.log(err)
                    })
                }else{

                    let insertQuery =
                        `insert into loan_list( name,time,money,type,href,tag,icon) values(
                       '${ctx.request.body.name}',
                       '${ctx.request.body.time}',
                       '${ctx.request.body.money}',
                       ${type},'${ctx.request.body.url}','${tag[0]}','${imgurl}')`;


                    connection.query(
                        insertQuery,
                        function(err,result){

                        })
                }
            })

        })
        ctx.body = 'it works!!'
    })
}
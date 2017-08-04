const multer = require('koa-multer')
const path = require('path')

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
})

var upload = multer({ storage: storage });

module.exports = function(router,body,connection){

    router.post('/upload', upload.single('files'), async (ctx, next) => {
        ctx.body = {
            filename: ctx.req.file.filename//返回文件名
    }
    })


    router.post('/admin/api/getform',body,ctx => {

        console.log(ctx.request.body);
        ctx.body = 'it works!!'
    })
}
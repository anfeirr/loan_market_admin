const router = require('koa-router')();
const list = require('./modules/list/router')
const user = require('./modules/user/router')
const listItem = require('./modules/list/getListItem')

module.exports = function(app,body,connection) {

    list(router,body,connection);
    user(router,body,connection);
    listItem(router,body,connection);
    app.use(router.routes());

    app.listen(4000);
}
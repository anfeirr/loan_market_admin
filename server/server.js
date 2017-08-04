import Koa from 'koa';
import {sqlConf,serverConf} from "./conf"
const app = new Koa();
const body = require('koa-body')();
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const serve = require('koa-static')
const routes = require('./routes')

//连接数据库
const connection = mysql.createConnection(sqlConf);

connection.connect();

routes(app,body,connection);

app.use(serve(__dirname + '/public'))

app.listen(serverConf.port,() => {
    console.log('run at port ',serverConf.port);
});


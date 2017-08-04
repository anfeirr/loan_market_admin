import Koa from 'koa';
const app = new Koa();
const body = require('koa-body')();
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const serve = require('koa-static')
const routes = require('./routes')

//连接数据库
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'loan'
});

connection.connect();

routes(app,body,connection);

app.use(serve(__dirname + '/public'))

console.log('run at port 4000');
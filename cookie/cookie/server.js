/*
* 这里是node执行的代码
* */

const express = require('express');//引入express模板
const swig = require('swig');
const Cookies = require('cookies');//引入cookies模板
const app = express();
app.use('/public', express.static('./static'));//express下的类文件

app.engine('html', swig.renderFile);
app.set('views', './view');
app.set('view engine', 'html');
swig.setDefaults({cache: false});

app.get('/', (req, res) => {//本地
    let cookies = new Cookies( req, res );
    if (req.headers.cookie) {
        res.send('老朋友，欢迎你再次光临');//当客户端请求服务器，服务器可以通过头信息发送一个cookie字段的数据给客户端，客户端接收到响应以后，如果头信息中有cookie，那么就会存储在本地
    } else {
        cookies.set('a', 1, {
            maxAge: 300000
        });
        cookies.set('b', 2);
        res.send('欢迎你的光临');
    }
});
app.get('/a', (req, res) => {
    let cookies = new Cookies( req, res );
    cookies.set('a', 1, {
        maxAge: 300000,
        path: '/a'
    });
    res.send('欢迎你的光临');
});
app.listen(8080);
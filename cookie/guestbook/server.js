const express = require('express');
const swig = require('swig');
const Cookies = require('cookies');
const qs = require('querystring');
const bodyParser = require('body-parser')

const app = express();

app.use('/public', express.static('./static'));

app.engine('html', swig.renderFile);
app.set('views', './view');
app.set('view engine', 'html');
swig.setDefaults({cache: false});

/*
* 解析post提交的经过urlencode编码的数据
* 把数据放在req.body属性中
* */
app.use( bodyParser.urlencoded({extended: true}) );

var cookies = {};
var data = {
    title: '留言板'
};
var C;
var users = [
    {
        username: 'gxx',
        password: '123'
    }
];

// 访问任何的url都会执行use中的函数
app.use( (req, res, next) => {

    C = new Cookies( req, res );

    if (req.headers.cookie) {
        cookies = qs.parse(req.headers.cookie, '; ');
    } else {
        cookies = {};
    }
    // 用户是登录状态
    if (cookies.username) {
        data.username = cookies.username;
    } else {
        data.username = '';
    }
    next();
} );

app.get('/', (req, res) => {
    res.render('index', data);
});
app.get('/login', (req, res) => {
    res.render('login', data);
});
app.post('/login', (req, res) => {
    if ( verifyUser(req.body.username, req.body.password) ) {
        C.set('username', req.body.username, {
            httpOnly: false  //若httpOnly:true 只能作为http传输
        });
        res.send('登录成功');
    } else {
        res.send('登录失败');
    }
});
app.get('/logout', (req, res) => {
    C.set('username', null);
    res.send('登录成功');
});
app.listen(8080);

function verifyUser(username, password) {
    return users.filter( user => {
        return user.username == username && user.password == password;
    } )[0];
}
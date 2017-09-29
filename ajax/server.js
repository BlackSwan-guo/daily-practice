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

app.get('/', (req, res) => {
    res.render('index');
});

/*
* 通过get方式来访问
*   get方式的请求不能带请求正文
*
*   queryString
*       查询字符串
*       放在url的path后面的内容，使用?进行分隔
*       http://miaov.com/video?id=1&type=1
*       queryString一般是一个key/value形式，key和value使用=进行连接，多个key/value使用&连接
*       无论是get请求还是post请求还或是其他请求，queryString都是可以带的，queryString和请求方式没有关联
*
*       get没有请求正文，post请求可以
*
*       不论是get请求还是post请求，都可以是同querySting传递数据给后端，但是queryString的内容长度是有限制的（url长度限制）
* */
app.get('/verifyUsername', (req, res) => {

    // console.log(req.query.username);

    var users = ['leo', 'motao', 'tongbin'];

    setTimeout(function() {
        if (req.query.username) {
            if (users.includes(req.query.username)) {
                res.send('该用户名已经被注册了');
            } else {
                res.send('该用户名可以注册');
            }
        } else {
            res.send('请传入要验证的用户名');
        };
    }, 0);

});

app.post('/verifyUsername', (req, res) => {

    console.log(req.body);
    console.log(req.query);

    res.send('ok')

});


app.get('/getXML', (req, res) => {
    res.setHeader('content-type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="ISO-8859-1"?>
<notes>
    <note>
        <to>George1</to>
        <from>John</from>
        <heading>Reminder</heading>
        <body>Don't forget the meeting!</body>
    </note>
    <note>
        <to>George2</to>
        <from>John</from>
        <heading>Reminder</heading>
        <body>Don't forget the meeting!</body>
    </note>
</notes>
`);
});

app.get('/getJSON', (req, res) => {

    res.send('[1,2,3]');

});

app.get('/getData', (req, res) => {

    console.log(req.query.username);

    res.send('getData');

});

app.post('/postData', (req, res) => {

    console.log(req.body.username);
    res.send('postData');

});

app.get('/getData2', (req, res) => {
    res.send('getData2...!!!!!~~~~~~');
});

app.post('/postData2', (req, res) => {
    res.send('postData2...');
});

app.listen(8888);

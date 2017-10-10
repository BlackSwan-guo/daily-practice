const express = require('express');
const swig = require('swig');
const Cookies = require('cookies');
const qs = require('querystring');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer  = require('multer');
const axios = require('axios');

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

app.get('/data', (req, res) => {
    console.log('有人请求了');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('hello');
});

app.get('/getbaidu', (req, res) => {
    // 访问百度

    axios.get('http://www.baidu.com/')
        .then( response => {
            // console.log(response);
            res.send(response.data);
        } );


});

app.get('/jsonp-data', (req, res) => {
    // res.send('var a = 1-2');

    let callback = req.query.callback || 'fn';

    res.send(callback + '(1-2)');
});


app.listen(8888);

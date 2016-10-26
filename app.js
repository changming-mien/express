var express = require('express');
var app = express();
var mysql = require('mysql');
app.use(express.static('public'));
// 设置mysql
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'express_test'
});
connection.connect();
// 配置swig
var swig = require('swig');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
// 配置路由
app.get('/', function(req, res, next) {
	res.render('index');
})
app.get('/receive', function(req, res, next) {
	//console.log("前台发来的数据", req.query.username); //此username为前台此username为数据库$('#username')的value值
	var post = {
		username: req.query.username
			// 此username为数据库username
	};
	var query = connection.query('INSERT INTO express SET ?', post, function(err, result) {
		if (err) {
			res.json({
				success: 'no',
				msg: "插入失败"
			})
		} else {
			res.json({
				success: 'ok',
				msg: "插入成功"
			})
		}

	});


});

// 容错机制
app.get('*', function(req, res, next) {
	res.status(404);
	res.end('404');
})
app.use(function(err, req, res, next) {
		res.status(500);
		res.end('err...');
	})
	// 启动
app.listen(8081, function() {
	console.log('端口已启动');
})
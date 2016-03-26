//express
var express=require('express')
var app=express()
var path=require('path')
compression
var compression = require('compression')
app.use( compression() )

var options = { //这里是只给静态文件设置响应头
  maxAge: '5s',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}
app.use(  express.static( path.join(__dirname)  , options )    )


//serve-favicon 
var favicon=require('serve-favicon')
app.use(favicon('./img/food5.ico'))  

//body-parse
var bodyParser = require('body-parser');
app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({ extended: true })) 

//cookie-parser
var cookie = require('cookie-parser');
app.use(cookie())

//express-session
var session = require('express-session')
//var MongoStore = require('connect-mongo')(session);
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' ,
						/*store:new MongoStore({
							url:'mongodb://localhost:27017/array',
							collection:'session'	
						})*/
}));

//cheerio
var cheerio=require('cheerio')
//var $=cheerio.load(html,{decodeEntities: false})

//memory-cache
//var cache=require('memory-cache')

//multer
/*var multer  = require('multer')
var upload = multer({ dest: './img/upload' })*/

//morgan
/*var morgan = require('morgan')
app.use(morgan('combined'))*/

//debug

/*//初始话生产环境用
if('development'===app.get('env')){
	app.locals.pretty=true;	
}*/
//app.listen(80,function(){console.log('running ')})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/',function(req,res){
	//var time=new Date()
	//console.log(time.toLocaleString())
	//res.send('<h1>hello world</h1>')
	res.redirect('/book')
})

var router_P_movie=require('./P_movie/router_P_movie')
router_P_movie.routerall(app)

var router_P_book=require('./P_book/router_P_book')
router_P_book.routerall(app)






//~~~~~socket part~~~~~~~~~~~~~~~~~~~~~~~~
/*var http = require('http').createServer(app)
//引入socket.io模块并绑定到服务器;
var io = require('socket.io').listen(http) 
//聊天页面 必须放在 io变量下面，否则无法传值
var P_socket=require('./P_socket/node_P_socket')
P_socket.socket(io)*/

//http.listen(80)
/*http*/app.listen(8080,function(){console.log('running ~~~')})


//~~~404页面~~~~~~~~~~~~
//此处之所以起作用的原因是，*这个路径通配符，它的优先级要低于具体的配置好的接口路径值，所以不会对其他接口造成影响。
//所以凡是没有配置的路径，都会以此*路径去走,也就是404页面
app.get('*',function(req,res){
	res.send('<h1>404 NOT FIND:sorry.</h1><br/> <a href="/book">返回首页</a>')	
})


	

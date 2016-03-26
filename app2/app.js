var express=require('express')
var app=express()
var path=require('path')
compression
var compression = require('compression')
app.use( compression() )

var options = { 
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
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' ,
}));

var cheerio=require('cheerio')
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/',function(req,res){
	//var time=new Date()
	//res.send('<h1>hello world</h1>')
	res.redirect('/book')
})


var router_P_book=require('./P_book/router_P_book')
router_P_book.routerall(app)





app.get('/forever',function(req,res){
	res.send('<h2>forever test now</h2>')	
})

app.listen(8080,function(){console.log('running ~~~')})


//~~~404页面~~~~~~~~~~~~
app.get('*',function(req,res){
	res.send('<h1>404 not found</h1><br/> <a href="/book">返回首页</a>')	
})


	

//express
var express=require('express')
var app=express()
var path=require('path')
app.use(express.static( path.join(__dirname) ))

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

app.listen(80,function(){console.log('running ')})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/',function(req,res){
	var time=new Date()
	console.log(time.toLocaleString())
	res.send('<h1>hello world</h1>')
})

var router_P_movie=require('./P_movie/router_P_movie')
router_P_movie.routerall(app)

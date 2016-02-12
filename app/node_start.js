//express
var express=require('express')
var app=express()
app.use(express.static('./'))

//serve-favicon 
var favicon=require('serve-favicon')
app.use(favicon('./img/food5.ico'))  

//body-parse
var bodyParser = require('body-parser');
app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({ extended: true })) 

//express-session
var session = require('express-session')
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));

//cookie-parser
var cookie = require('cookie-parser');
app.use(cookie())

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




app.listen(3000,function(){console.log('running ')})
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/',function(req,res){
	console.log('index test')
	res.send('hello world')
	
})

var P_movie=require('./P_movie/node_P_movie')
P_movie.routerall(app)

var P_adminIn=require('./P_movie/node_P_adminIn')
P_adminIn.routerall(app)



var P_list=require('./P_movie/node_P_list')
P_list.routerall(app)

var P_details=require('./P_movie/node_P_details')
P_details.routerall(app)


var mongodb_array=require('../mongodb/mongodb_array')
var coll_admin=mongodb_array.collection('admin')

var G_login=require('../G_login/node_G_login')

var P_book=require('./node_P_book')
var P_booksave=require('./node_P_booksave')
var P_booktable=require('./node_P_booktable')
var P_bookdetails=require('./node_P_bookdetails')

function routerall(app){
	P_book.routerall(app)
	P_booksave.routerall(app)
	P_booktable.routerall(app)
	P_bookdetails.routerall(app)
	
	
	
	G_login.ajax(app,coll_admin)	
	


	
}

exports.routerall=routerall


var P_movie=require('./node_P_movie')
var P_details=require('./node_P_details')

var P_admin=require('./node_P_admin')
var P_adminNav=require('./node_P_adminNav')
var P_adminIn=require('./node_P_adminIn')
var P_list=require('./node_P_list')

function routerall(app){
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	

P_movie.routerall(app)
P_details.routerall(app)	

P_admin.routerall(app)
P_adminNav.routerall(app)
P_adminIn.routerall(app)
P_list.routerall(app)


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
}

exports.routerall=routerall
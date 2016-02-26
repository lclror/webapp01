
/*var html='\
<p class="myleft p2">welcome : <span>null</span></p>\
';*/

function process($){
	var router1=function(req,res,next){
		var admin=req.session.adminlogin
		if(admin){
			var islogin=' welcome : <span>'+admin.username+'</span>'
			$("body h3.islogin").html(islogin)	
			//html111=$.html()
		}
		next()
	}	
	return router1
}

exports.process=process
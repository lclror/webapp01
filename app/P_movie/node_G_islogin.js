
/*var html='\
<p class="myleft p2">welcome : <span>null</span></p>\
';*/

function process($){
	var router1=function(req,res,next){
		var admin=req.session.adminlogin
		if(admin){
			var islogin='<p class="myleft p1">科幻类 / welcome : <span>'+admin.username+'</span></p><br/>'
			$("body p").html(islogin)	
		}/*else{
			$("body p.p2").remove()	
		}*/
		next()
	}	
	return router1
}

exports.process=process
var html='<div id="search"><input class="form-input" type="text"><a>search</a></div>';

function process($,$parent){
	$parent.html(html)
	
	var pro=function(req,res,next){
	var interfaceUrl=req._parsedUrl.pathname
		
	$("#search>a").attr('href',interfaceUrl+'?search=')	
	next()
	}
	return pro;	
}

exports.process=process


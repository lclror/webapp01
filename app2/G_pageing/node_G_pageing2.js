var html='\
<div id="pageing">\
	<a href="#">1</a><a href="#">2</a><a href="#">3</a>\
</div>\
';
function process($,
$parent,
limit,
whereCollPageing,
urlKeyFromCategory,		
collKeyFromCategory,		
urlKeyFromSearch,			
collKeyfromSearch			
){ 

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$parent.html(html)
	var pro=function(req,res,next){
		var interfaceUrl=req._parsedUrl.pathname

		var query={}
		
		var c_page=req.query.page || 0  
		

		var cate_name=req.query[urlKeyFromCategory] 
		if(cate_name){
			query={category:req.cate_array_index}	
			if(collKeyFromCategory){
				for(var i in collKeyFromCategory){
					collKeyFromCategory[i]=/*cate_name*/req.cate_array_index
					query=collKeyFromCategory
				}	
			}
		}
		

		var search_val=req.query[urlKeyFromSearch] 
		if(search_val){
			query={title:new RegExp( search_val+'.*','i')}

			if(collKeyfromSearch){
				for(var i in collKeyfromSearch){
					collKeyfromSearch[i]=new RegExp( search_val+'.*','i')
					query=collKeyfromSearch
				}
			}
		}


		whereCollPageing.find(query).count(function(err,count){
			var btnCount=Math.ceil(count/limit)
			if(btnCount==1){btnCount=0} //按钮数量为1时，按钮不显示
			var div=''
			for(var i=0;i<btnCount;i++){
				var skip=i*limit

				var a='<a href="'+interfaceUrl+'?skip='+skip+'&page='+i+'">'+(i+1)+'</a>'

				if(cate_name){
					a='<a href="'+interfaceUrl+'?skip='+skip+'&page='+i+'&'+urlKeyFromCategory+'='+cate_name+'">'+(i+1)+'</a>'	
				}

				if(search_val){
					a='<a href="'+interfaceUrl+'?skip='+skip+'&page='+i+'&'+urlKeyFromSearch+'='+search_val+'">'+(i+1)+'</a>'	
				}

				if(c_page==i ){ 
					a='<a class="current">'+(i+1)+'</a>'	
				}					
				div+=a	
			}
			$("div#pageing").html(div)
			next();
		})
	}
	return pro;	
}
exports.process=process


var html='\
<div id="pageing">\
	<a href="#">1</a><a href="#">2</a><a href="#">3</a>\
</div>\
';

function process($,$parent,pageingUrl,btn_coll,limit,param){  
//最后一个参数:param 是给a标签中的路径用的,也可以理解为变动的路径/key ，例如/movie 它是写死的，那要是灵活变动的路径，就要用req.params[param]这种方法了
	$parent.html(html)
	var pro=function(req,res,next){
		//~~~生成按钮~~~~~~~
		//var _skin=req.query.skin
		//var _limit=req.query.limit  //这里取到的值是字符串，所以不能进行除法运算，必须先转换类型为number
		var _skin=parseInt(req.query.skip) || 0
		var _limit=parseInt(req.query['limit']) || limit
		//下面是当前页
		var c_page=Math.ceil(_skin/_limit) 
		//console.log(_skin+_limit+'====>' +c_page)
		var cate_name=req.params[param] || ''
		//console.log(cate_name+'====>')
		var query={}
		if(cate_name){
			query={category:cate_name}	
		}
		btn_coll.find(query).count(function(err,count){
			var btnCount=Math.ceil(count/limit)
			var div=''
			for(var i=0;i<btnCount;i++){
				var current=null
				if(c_page==i){
					current='current'	
				}
				var skip=i*limit
				var a='<a class="'+current+'" href="'+pageingUrl+cate_name+'?skip='+skip+'&limit='+limit+'">'+i+'</a>'
				div+=a	
			}
			$("div#pageing").html(div)
			next();
		})
	}
	return pro;	
}
exports.html=html
exports.process=process


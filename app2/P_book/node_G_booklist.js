var html='\
<section id="booklist">\
	<ul class="book_list inFLeft rows-count-3-gap-3">\
		<!--\
		<li>\
			<img src="../P_book/img/book01.jpg"/>\
			<dt>满月之夜白鲸现</dt>\
			<dl>片山恭一</dl>\
			<dl>￥ 12.00</dl>\
			<a href="#">查看详情</a>\
			<p>那一年，是听莫扎……。</p>\
		</li>\
		-->\
</section>\
'
function process($,$parent,coll_booklist){
	$parent.html(html)
	var pro=function(req,res,next){
		var query={}
		var skip=0
		var limit=6
		//~~~with pageing~~~~~~~~~~
		var isskip=req.query.skip
		if(isskip){skip=parseInt(isskip)}
		//~~~with category~~~~~~~~~~~~~~~~~~~~~~~
		var category=req.query.category
		if(category){
			var tag_name=req.cate_array_index
			//console.log(tag_name)
			query={category:tag_name}	
		}
		//~~~with search~~~~~~~~~~~~~~~~~~~~~~~
		var search_val=req.query.search
		if(search_val){
			query={title:new RegExp( search_val+'.*','i')}	
		}
		
		coll_booklist.find(query).skip(skip).limit(limit).toArray(function(err,result){
			var ul=''
			if(result[0]==null){
				ul='<h2>未搜索到结果</h2>'
			}
			for(var i in result){
				var _id=result[i]._id
				var image=result[i].image
				var title=result[i].title
				var author=result[i].author
				var price=result[i].price
				var summary=result[i].summary
				
				var img='<img src="'+image+'" alt="封面">'
				var dt_title='<dt>'+title+'</dt>'
				var dl_author='<dl>'+author+'</dl>'
				var dl_price='<dl>'+price+'</dl>'
				var a='<a target="_blank" href="/book/details/'+_id+'">查看详情</a>'
				var p='<p>'+summary.substring(0,100)+'...</p>'
				
				var li='<li>'+img+dt_title+dl_author+dl_price+a+p+'</li>'
				ul+=li
			}
			$('#booklist>ul.book_list').html(ul)
			next()
		})
	}
	return pro;	
}

exports.process=process
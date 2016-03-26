
var html='\
<section id="booklist2">\
	<table>\
		<thead>\
			<tr><th>书名</th><th>作者</th><th>价格</th><th>发布日期</th><th>访问量</th><th>查看</th><th>更新</th><th>删除</th></tr>\
		</thead>\
		<tbody>\
			<tr><td>aaa</td><td>aaa</td><td>aaa</td><td>aaa</td><td>0</td><td><a>查看</a></td><td><a>修改</a></td><td><button>删除</button></td></tr>\
		</tbody>\
	</table>\
</section>\
';


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
			query={category:tag_name}	
		}
		//~~~with search~~~~~~~~~~~~~~~~~~~~~~~
		var search_val=req.query.search
		if(search_val){
			query={title:new RegExp( search_val+'.*','i')}	
		}		
		
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		coll_booklist.find(query).skip(skip).limit(limit).toArray(function(err,result){
			var tr=''
			if(result[0]==null){
				tr='<h2>未搜索到结果</h2>'
			}			
			for(var i in result){
				var title='<td>'+result[i].title+'</td>'
				var author='<td>'+result[i].author+'</td>'
				var price='<td>'+result[i].price+'</td>'
				var pubdate='<td>'+result[i].pubdate+'</td>'
				var pv='<td>'+result[i].pv || 0+'</td>'	//加入pv小功能
				
				var id=result[i]._id
				var look='<td><a href="/book/details/'+id+'">查看</a></td>'
				var update='<td><a href="/book/admin01/save/'+id+'">修改</a></td>'
				var button='<td><button>删除</button</td>'
				if(result[i].pv>12){ //~~权限管理 ~~~~~~~~~~~~
					button='<td><button disabled>删除(未获得权限)</button</td>'
				}
				tr+='<tr>'+title+author+price+pubdate+pv+look+update+button+'</tr>'
			}	
			$("#booklist2>table>tbody").html(tr)
			next()
		})		
		
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~					
	}
	return pro;
}

exports.process=process



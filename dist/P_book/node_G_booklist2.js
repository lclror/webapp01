function process(e,t,n){t.html(html);var r=function(t,r,i){var s={},o=0,u=6,a=t.query.skip;a&&(o=parseInt(a));var f=t.query.category;if(f){var l=t.cate_array_index;s={category:l}}var c=t.query.search;c&&(s={title:new RegExp(c+".*","i")}),n.find(s).skip(o).limit(u).toArray(function(t,n){var r="";n[0]==null&&(r="<h2>未搜索到结果</h2>");for(var s in n){var o="<td>"+n[s].title+"</td>",u="<td>"+n[s].author+"</td>",a="<td>"+n[s].price+"</td>",f="<td>"+n[s].pubdate+"</td>",l="<td>"+n[s].pv||"0</td>",c=n[s]._id,h='<td><a href="/book/details/'+c+'">查看</a></td>',p='<td><a href="/book/admin01/save/'+c+'">修改</a></td>',d="<td><button>删除</button</td>";n[s].pv>12&&(d="<td><button disabled>删除(未获得权限)</button</td>"),r+="<tr>"+o+u+a+f+l+h+p+d+"</tr>"}e("#booklist2>table>tbody").html(r),i()})};return r}var html='<section id="booklist2">	<table>		<thead>			<tr><th>书名</th><th>作者</th><th>价格</th><th>发布日期</th><th>访问量</th><th>查看</th><th>更新</th><th>删除</th></tr>		</thead>		<tbody>			<tr><td>aaa</td><td>aaa</td><td>aaa</td><td>aaa</td><td>0</td><td><a>查看</a></td><td><a>修改</a></td><td><button>删除</button></td></tr>		</tbody>	</table></section>';exports.process=process;
;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' ,
				G_search:'../G_search/G_search',
			}	
		});		
		define( ["add",'G_search'], factory );		
	} else {factory( jQuery )}
}(function( add,G_search ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function P_list(opts){
this.html='';

this.id='#list' 				
this.opts=$.extend({},P_list.STATE,opts)
}

P_list.STATE={
	//state : 'off',
}

P_list.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
//$("#list h1").click(function(e) {
/*	$.get('/ajax/movie/list',{},function(result){
		var tr=''
		for(var i in result){
			var title='<td>'+result[i].title+'</td>'
			var director='<td>'+result[i].director+'</td>'
			var country='<td>'+result[i].country+'</td>'
			var year='<td>'+result[i].year+'</td>'	
			
			var id=result[i]._id
			var look='<td><a href="/movie/details/'+id+'">查看</a></td>'
			var update='<td><a href="/movie/admin/save/'+id+'">修改</a></td>'
			var button='<td><button>删除</button</td>'
			tr+='<tr>'+title+director+country+year+look+update+button+'</tr>'
		}	
		$("#list>table>tbody").html(tr)
	},'json').done(function(){  
	//使用done()是因为第一个ajax请求后，数据取回到写入页面需要时间，而下面的dom操作同时进行，是找不到可以作用的dom的，因为此时dom还未写入页面中.
		$("#list>table>tbody>tr>td>button").click(function(e) {
		var $td1=$(this).parent('td').siblings('td').eq(0)
		var title=$td1.text()
		//alert(title)
		$.get('/ajax/movie/list/delete',{title:title},function(result){
			if(result[0].status=='success'){
				alert('success')
				$td1.parent().remove()
			}	
		},'json')
		});
	})
*///});

		$("#list>table>tbody>tr>td>button").click(function(e) {
			var $td1=$(this).parent('td').siblings('td').eq(0)
			var title=$td1.text()
			//alert(title)
			$.get('/ajax/movie/list/delete',{title:title},function(result){
				if(result[0].status=='success'){
					alert('success')
					$td1.parent().remove()
				}	
			},'json')
		});

//~~~~~~~~~~~~~~~~~~~~~~
}


P_list.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'P_list',P_list) 
//return P_list;
$.fn.addModule($('#insert_search'),'G_search',G_search) 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))

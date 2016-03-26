;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' ,
			}	
		});		
		define( ["add",], factory );		
	} else {factory( jQuery )}
}(function( add ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function P_booklist2(opts){
this.html='\
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

this.id='#booklist2' 				
this.opts=$.extend({},P_booklist2.STATE,opts)
}

P_booklist2.STATE={
	//state : 'off',
}

P_booklist2.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
		$("#booklist2>table>tbody>tr>td>button").click(function(e) {
			var $td1=$(this).parent('td').siblings('td').eq(0)
			var title=$td1.text()
			//alert(title)
			$.post('/ajax/book/booklist2/delete',{title:title},function(result){
				if(result[0].status=='success'){
					alert('success')
					$td1.parent().remove()
				}	
			},'json')
		});

//~~~~~~~~~~~~~~~~~~~~~~
}


P_booklist2.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
//$.fn.addModule($('body'),'P_booklist2',P_booklist2) 
return P_booklist2;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))

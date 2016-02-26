;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule',
				G_comment:'../G_comment/G_comment',
			}	
		});		
		define( ["add",'G_comment',], factory );		
	} else {factory( jQuery )}
}(function( add,G_comment ) {  //有几个模块就要有几个占位符，即便那个模块没有返回对象。否则系统匹配不上位置。
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function P_details(opts){
this.html='';

this.id='#details' 				
this.opts=$.extend({},P_details.STATE,opts)
}

P_details.STATE={
	//state : 'off',
	/*paths:{
		ajaxURL1:'/ajax/movie/comment',
		ajaxURL2:'/ajax/movie/comment/del',
	}*/
}

P_details.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
/*var comment_id=0
var to=null
var $li=''
$("#comment>ul>li a").click(function(e) {
	comment_id=$(this).attr("name")
	to=$(this).siblings("h4").text()
	$li=$(this).parents("li")
	
	alert(comment_id+' , '+to)
});
$("#comment>button").click(function(e) {
	var movie_id=$("#comment>span").text()
	var content=$("#comment>textarea").val()
	
	
	$.post(state.paths.ajaxURL1,{movie_id:movie_id,content:content,comment_id:comment_id,to:to},function(result){
		if(result.status=='noSession'){
			comment_id=0
			alert('请先登陆')	
		}else{
			var img='<img src="../../img/user/user.jpg"/>'
			var form='<h4>'+result.form+'</h4>'
			var content1='<p>'+content+'</p>'
			var li='<li>'+img+form+content1+'</li>'
			var div='<div>'+img+form+content1+'</div>'
			
			$("#comment>textarea").val(null)
			
			if(result.status=='comment'){
				alert('评论成功')	
				$("div#comment>ul.ul1").append(li)
			}else if(result.status=='reply'){
				comment_id=0
				alert('回复成功')
				$li.append(div)
			}
		}
	},'json')
});
//~~~~comment delete ajax~~~~~~~~~~~~~
$("#comment>ul *>h4>span").click(function(e) {
	var $parent=$(this).parent().parent()
	var comment_id=$(this).attr("id")
	var time=$(this).attr("name")
	//alert(comment_id+' : '+time)
	$.post(state.paths.ajaxURL2,{comment_id:comment_id,time:time},function(result){
		if(result.status=='error'){
			alert('删除失败')	
		}else if(result.status=='success'){
			alert('删除成功')
			$parent.remove()
		}	
	},'json')
});

*/


//~~~~~~~~~~~~~~~~~~~~~~
}


P_details.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	

$.fn.addModule($('body'),'p_details',P_details) //不要忘了运行自身代码
//return P_details;
//~~~~~~add require modules~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*var comment_ajax_opts={
	paths:{
		ajaxURL1:'/ajax/movie/comment',
		ajaxURL2:'/ajax/movie/comment/del',	
	}	
}*/
$.fn.addModule($('section#insert_comment'),'g_comment',G_comment/*,comment_ajax_opts*/) 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
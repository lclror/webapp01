;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' 
			}	
		});		
		define( ["add",], factory );		
	} else {factory( jQuery )}
}(function(  ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function G_comment(opts){
this.html='\
	<div id="comment">\
		<span>1</span>\
		<h1>评论区</h1>\
		<ul class="ul1">\
			<li>\
				<img src="../img/user/user.jpg"/>\
				<h4>user01 <span> 删除</span></h4>\
				<p>content! content! content!</p>\
				<a href="#textarea" name="oid">回复</a>\
				<div>\
					<img src="../img/user/user.jpg"/>\
					<h4>user01 <span> 删除</span></h4>\
					<p> <span>回复-user2 : </span>content! </p>\
					<a href="#textarea" name="oid">回复</a>\
				</div>\
				<div>\
					<img src="../img/user/user.jpg"/>\
					<h4>user01</h4>\
					<p>content! content!</p>\
					<a href="#textarea" name="oid">回复</a>\
				</div>\
			</li>\
			<li><img src="../img/user/user.jpg"/><h4>user01</h4><p>nice!</p><a href="#textarea" name="oid">回复</a></li>\
		</ul>\
		<textarea id="textarea"  cols="60" rows="4"></textarea><br/>\
		<button class="btn-opacity" type="button">submit</button>\
	</div>\
';

this.id='#comment' 				
this.opts=$.extend({},G_comment.STATE,opts)
}

G_comment.STATE={
	//state : 'off',
	paths:{
		ajaxURL1:'/ajax/movie/comment',
		ajaxURL2:'/ajax/movie/comment/del',
	}
}

G_comment.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~reply button part~~~~~~~~~~~~~~~~~~
var comment_id=0
var to=null
var $li=''
$("#comment>ul>li a").click(function(e) {
	comment_id=$(this).attr("name")
	to=$(this).siblings("h4").text()
	$li=$(this).parents("li")
	//alert(comment_id+' , '+to)
});

//~~~~comment submit part~~~~~~~~~~~~~
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


//~~~~~~~~~~~~~~~~~~~~~~
}


G_comment.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
//$.fn.addModule($('body'),'G_comment',G_comment) 
return G_comment;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
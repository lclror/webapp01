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
function P_details(opts){
this.html='';

this.id='#xxx' 				
this.opts=$.extend({},P_details.STATE,opts)
}

P_details.STATE={
	//state : 'off',
}

P_details.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
$("#comment>button").click(function(e) {
	var movie_id=$("#comment>span").text()
	var content=$("#comment>textarea").val()
	$.post('/ajax/movie/comment',{movie_id:movie_id,content:content},function(result){
		if(result.status=='noSession'){
			alert('请先登陆')	
		}else{
			alert('评论提交成功 testing')	
			
			var img='<img src="../../img/user/user.jpg"/>'
			var form_user_id='<h4>'+result.form_user_id+'</h4>'
			var content1='<p>'+content+'</p>'
			var li='<li>'+img+form_user_id+content1+'</li>'
			$("div#comment>ul.ul1").append(li)
		}
	},'json').done(function(){
		$("#comment>textarea").val(null)	
	})
});
//~~~~~~~~~~~~~~~~~~~~~~
}


P_details.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'P_details',P_details) 
//return P_details;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
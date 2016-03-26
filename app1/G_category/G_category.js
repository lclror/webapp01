;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' 
			}	
		});		
		define( ["add",], factory );		
	} else {factory( jQuery )}
}(function( add ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function G_category(opts){
this.html='\
	<nav id="category" class="inFLeft inmarRight-2">\
		<a href="/movie" class="selected">首页</a>\
		<a href="/movie?category=科幻">科幻</a>\
		<a href="/movie?category=喜剧">喜剧</a>\
		<a href="/movie?category=惊悚">惊悚</a>\
		<a href="/movie?category=剧情">剧情</a>\
		<a href="/movie?category=励志">励志</a>\
		<a href="/movie?category=武侠">武侠</a>\
		<a href="/movie?category=动画">动画</a>\
	</nav>\
';

this.id='#category' 				
this.opts=$.extend({},G_category.STATE,opts)
}

G_category.STATE={
	//state : 'off',
}

G_category.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}


G_category.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
//$.fn.addModule($('body'),'G_category',G_category) 
return G_category;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
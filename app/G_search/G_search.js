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
function G_search(opts){
this.html='\
<div id="search"><input class="form-input" type="text"><a>search</a></div>\
';

this.id='#search' 				
this.opts=$.extend({},G_search.STATE,opts)
}

G_search.STATE={
	//state : 'off',
}

G_search.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
var _href=$("#search>a").attr("href")
var $input=$("#search>input")

$input.blur(function(){
	var val=$input.val()
	//var href='/movie?search='+val
//	$("#search>a").attr("href",href)
	
	//var _href=href.replace(/xxx/,val)
	var href=_href+val
	$("#search>a").attr("href",href)
})

$input.focus(function(e) {
		//var _href=$input.attr("href")+'?search='
		$("body").keydown(function(e) {
			if(e.keyCode==13){
					
				var val=$input.val()
				//var href='http://192.168.36.117/movie?search='+val	
				//var href='/movie?search='+val	
				
				//href=href.replace(/xxx/,val)
				var href=_href+val
				//alert(href)
				window.location.href=href 
				//用href 来跳转可以不写主域名，默认就是当前域名下的跳转链接，在不确定主域名的情况下最有用.
			}
		});
});

//~~~~~~~~~~~~~~~~~~~~~~
}


G_search.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
//$.fn.addModule($('#insert_search'),'G_search',G_search) 
return G_search;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
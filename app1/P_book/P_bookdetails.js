;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' ,
				G_comment:'../G_comment/G_comment2',
				G_login:'../G_login/G_login',
			}	
		});		
		define( ["add",'G_comment','G_login'], factory );		
	} else {factory( jQuery )}
}(function( add,G_comment,G_login ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function G_bookdetails(opts){
this.html='';

this.id='#bookdetails' 				
this.opts=$.extend({},G_bookdetails.STATE,opts)
}

G_bookdetails.STATE={
	//state : 'off',
}

G_bookdetails.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
/*$("#page>dl>p").each(function(index, element) {
	var str=$(this).text()
	var newstr=str.replace(/\\r\\n/g,'<br/>')
	$(this).html(newstr)
});
*///~~~~~~~~~~~~~~~~~~~~~~
}


G_bookdetails.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'G_bookdetails',G_bookdetails) 
$.fn.addModule($('#insert_comment'),'G_comment',G_comment)
$.fn.addModule($('#insert_login'),'G_login',G_login)
//return G_bookdetails;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
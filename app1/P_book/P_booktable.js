;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' ,
				G_search:'../G_search/G_search',
				G_category:'../G_category/G_category',
				G_booklist2:'../P_book/G_booklist2',
			}	
		});		
		define( ["add",'G_search','G_category','G_booklist2'], factory );		
	} else {factory( jQuery )}
}(function( add,G_search,G_category,G_booklist2 ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function P_booktable(opts){
this.html='';

this.id='#booktable' 				
this.opts=$.extend({},P_booktable.STATE,opts)
}

P_booktable.STATE={
	//state : 'off',
}

P_booktable.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}


P_booktable.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'P_booktable',P_booktable) 
//return P_booktable;
$.fn.addModule($('#insert_search'),'G_search',G_search) 
$.fn.addModule($('#insert_category'),'G_category',G_category) 
$.fn.addModule($('#insert_booklist2'),'G_booklist2',G_booklist2) 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))

;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule',
				G_booklist:'../P_book/G_booklist',
				G_search:'../G_search/G_search',
				G_login:'../G_login/G_login',
				G_lunbo:'../G_lunbo/G_lunbo',
			}	
		});		
		define( ["add",'G_booklist','G_search','G_login','G_lunbo'], factory );		
	} else {factory( jQuery )}
}(function(add, G_booklist ,G_search, G_login, G_lunbo) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function P_book(opts){
this.html='';

this.id='#P_book' 				
this.opts=$.extend({},P_book.STATE,opts)
}

P_book.STATE={
	//state : 'off',
}

P_book.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}


P_book.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'P_book',P_book) 
$.fn.addModule($("#insert_booklist"),'G_booklist',G_booklist)
$.fn.addModule($("#insert_search"),'G_search',G_search)
$.fn.addModule($("#insert_login"),'G_login',G_login)
$.fn.addModule($("#insert_lunbo"),'G_lunbo',G_lunbo)
//return P_book;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
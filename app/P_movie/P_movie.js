;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' ,
				G_search:'../G_search/G_search'
			}	
		});		
		define( ["add",'G_search'], factory );		
	} else {factory( jQuery )}
}(function( add,G_search ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function P_movie(opts){
this.html='';

this.id='#movie' 				
this.opts=$.extend({},P_movie.STATE,opts)
}

P_movie.STATE={
	//state : 'off',
}

P_movie.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}


P_movie.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'P_movie',P_movie) 
//return P_movie;
$.fn.addModule($('#inser_search'),'G_search',G_search)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
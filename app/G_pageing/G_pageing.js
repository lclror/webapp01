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
function G_pageing(opts){
this.html='';

this.id='#pageing' 				
this.opts=$.extend({},G_pageing.STATE,opts)
}

G_pageing.STATE={
	//state : 'off',
}

G_pageing.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
/*var val=20/3
alert(val)
alert(Math.ceil(val))*/
/*$("#pageing>a").click(function(e) {
	$(this).addClass("current").siblings().removeClass("current")
});*/
//~~~~~~~~~~~~~~~~~~~~~~
}


G_pageing.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('#insert_pageing'),'G_pageing',G_pageing) 
//return G_pageing;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
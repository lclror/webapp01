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
function P_admin(opts){
this.html='';

this.id='#xxx' 				
this.opts=$.extend({},P_admin.STATE,opts)
}

P_admin.STATE={
	//state : 'off',
}

P_admin.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
$("#login>form>button").click(function(e) {
	
	var $input=$("#login>form>input")
	var name=$input.eq(0).val()
	var pass=$input.eq(1).val()
	
	$.post('/ajax/movie/adminlogin',{name:name,pass:pass},function(result){
		//alert(name)
		if(result[0].status=='error'){
			alert('error')	
		}else{
			alert('success')	
			window.location=result[0].path
		}
	},'json')
});

//~~~~~~~~~~~~~~~~~~~~~~
}


P_admin.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'P_admin',P_admin) 
//return P_admin;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))

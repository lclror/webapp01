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
function P_adminIn(opts){
this.html='';

this.id='#adminIn' 				
this.opts=$.extend({},P_adminIn.STATE,opts)
}

P_adminIn.STATE={
	//state : 'off',
}

P_adminIn.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
$("#adminIn button").click(function(e) {
	var $input=$("#adminIn>form>input")
	//if($input.val()==''){alert('内容不能为空')}else{}
	var title=$input.eq(0).val()
	var posters=$input.eq(1).val()
	var director=$input.eq(2).val()
	var country=$input.eq(3).val()
	var language=$input.eq(4).val()
	var year=$input.eq(5).val()
	var sourse=$input.eq(6).val()
	var descrtion=$("#adminIn>form>textarea").val()
	var nav=$("#adminIn>nav").text()
	
	$.post('/ajax/movie/adminIn',
		{title:title,
		posters:posters,
		director:director,
		country:country,
		language:language,
		year:year,
		sourse:sourse,
		descrtion:descrtion,
		nav:nav
		},function(result){
			alert(result[0].status)	
			$("#adminIn>form>input").val(null)
			$("#adminIn>nav").text(null)
		},'json'
	)
	
});
//~~~~~~~~~~~~~~~~~~~~~~
}


P_adminIn.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'P_adminIn',P_adminIn) 
//return P_adminIn;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
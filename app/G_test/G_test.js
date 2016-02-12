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
function G_test(opts){
this.html='';

this.id='#xxx' 				
this.opts=$.extend({},G_test.STATE,opts)
}

G_test.STATE={
	//state : 'off',
}

G_test.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
var doc=[
	{
		ti:'美国队长',
		text:'context context 01',
		src:'../movie01/mgdz.png'
	},
	{
		ti:'复仇者联盟',
		text:'context context 02',
		src:'../movie01/fczlm.png'	
	},
	{
		ti:'功夫熊猫',
		text:'context context 03',
		src:'../movie01/gfxm',	
	},

]

function wrap01(doc,font01,font02){
	var div=''
	for(var i in doc){
		var title='<li>'+doc[i][font01]+'</li>'
		var text='<li>'+doc[i][font02]+'</li>'
		var src=doc[i].src
		var a='<a href="'+src+'">'+title+text+'</a>'
		div+=a
	}
	return div;
}

var div=wrap01(doc,'ti','text')

$("#div01").append(div)
//~~~~~~~~~~~~~~~~~~~~~~
}


G_test.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'G_test',G_test) 
//return G_test;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' //以data-main 文件为索引起始位置
			}	
		});		
		define( ["add",], factory );		
	} else {factory( jQuery )}
}(function(  ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function G_lunbo(opts){
this.html='\
<div id="lunbo">\
           <ul class="">\
              <i class="kkleft myleft"></i> <i class="kkright myright"></i>\
           </ul>\
           <ul class="inFLeft">\
              <span></span>\
              <span></span>\
              <span></span>\
              <span></span>\
              <span></span>\
           </ul>\
           <ul id="sport" class="inFLeft">\
              <a><div>活动页面 one  <br/>Please insert the activity page</div></a>\
              <a><div>活动页面 two  <br/>Please insert the activity page</div></a>\
              <a><div>活动页面 three<br/>Please insert the activity page</div></a>\
              <a><div>活动页面 four <br/>Please insert the activity page</div></a>\
              <a><div>活动页面 five <br/>Please insert the activity page</div></a>\
           </ul>\
 </div>\
';

this.id='#lunbo' //不能为空，为空的话就添加不上html了，因为空也是作为一个子元素而存在。
//上面错误的例子， this.id='div.' 由于这样的命名规则是错误的，所以它会阻挡整个if()判断语句内脚本的执行，所以脚本就没有加载进来.				
this.opts=$.extend({},G_lunbo.STATE,opts)
}

G_lunbo.STATE={
	//loginstate : 'off',
}

G_lunbo.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
	var page=0
	$("#lunbo span").click(function(e) {
		e.stopPropagation()
		var i=$("#lunbo span").index(this)
		var leftval='-'+i+'00%'
		$("#sport").animate({left:leftval},500)
		page=i
		$(this).addClass("lunbospanh").siblings().removeClass("lunbospanh")
	}); 
	 
	 	 
$("#lunbo i:last").click(function(e) {
	e.stopPropagation()
		if(!$("#sport").is(":animated")){
			page+=1
		   if(page>4){page=0}
			$("#lunbo span").eq(page).trigger("click");
		}	
});	 

$("#lunbo i:first").click(function(e) {
   if(!$("#sport").is(":animated")){
		page-=1
		if(page<0){page=4}
		$("#lunbo span").eq(page).trigger("click")
	}
});


var kkk
$("#lunbo i:first, #lunbo i:last, #lunbo span").hover(function(){
	 clearInterval(kkk)
},function(){
	//if(!$("#sport").is(":animated")){
		kkk=setInterval( function(){
				$("#lunbo i:last").trigger("click")
		},4000)
	//}
}) 

//if(!$("#sport").is(":animated")){
	kkk=	setInterval( function(){
			$("#lunbo i:last").trigger("click")
	},4000)
//}
 
//~~~~~~~~~~~~~~~~~~~~~~
}


G_lunbo.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
//$.fn.addModule($('body'),'G_lunbo',G_lunbo) //修改模块用
return G_lunbo;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
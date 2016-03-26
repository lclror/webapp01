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
function G_booklist(opts){
this.html='\
<section id="booklist">\
	<ul class="inFLeft rows-count-3-gap-3 ">\
		<li>\
			<img src="../P_book/img/book01.jpg"/>\
			<dt>满月之夜白鲸现</dt>\
			<dl>片山恭一</dl>\
			<dl>￥ 12.00</dl>\
			<a href="#">查看详情</a>\
			<p>那一年，是听莫扎特、钓鲈鱼和家庭破裂的一年。说到家庭破裂，母亲怪自己当初没有\
			找到好男人，父亲则认为当时是被狐狸精迷住了眼，失常的是母亲，但出问题的是父亲……。</p>\
		</li>\
		<li>\
			<img src="../P_book/img/book01.jpg"/><dt>满月之夜白鲸现</dt><dl>片山恭一</dl>\
			<dl>￥ 12.00</dl>\
			<a href="#">查看详情</a>\
			<p>那一年，是听莫扎特、钓鲈鱼和家庭破裂的一年。说到家庭破裂，母亲怪自己当初没有\
			找到好男人，父亲则认为当时是被狐狸精迷住了眼，失常的是母亲，但出问题的是父亲……。</p>\
		</li>\
		<li>\
			<img src="../P_book/img/book01.jpg"/><dt>满月之夜白鲸现</dt><dl>片山恭一</dl>\
			<dl>￥ 12.00</dl>\
			<a href="#">查看详情</a>\
			<p>那一年，是听莫扎特、钓鲈鱼和家庭破裂的一年。说到家庭破裂，母亲怪自己当初没有\
			找到好男人，父亲则认为当时是被狐狸精迷住了眼，失常的是母亲，但出问题的是父亲……。</p>\
		</li>\
	</ul>\
</section>\
';

this.id='#booklist' 				
this.opts=$.extend({},G_booklist.STATE,opts)
}

G_booklist.STATE={
	//state : 'off',
}

G_booklist.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}


G_booklist.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
//$.fn.addModule($('body'),'G_booklist',G_booklist) 
return G_booklist;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
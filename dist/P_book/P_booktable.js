(function(e){typeof define=="function"&&define.amd?define("add",[""],e):e(jQuery)})(function(){$.fn.addModule=function(e,t,n,r){var t=new n(r);e.children(t.id).length==0?(e.append(t.html),setTimeout(function(){t.main(),t.render()},9)):setTimeout(function(){t.main(),t.render()},9)}}),function(e){typeof define=="function"&&define.amd?(requirejs.config({paths:{add:"../tools/addmodule"}}),define("G_search",["add"],e)):e(jQuery)}(function(){function e(t){this.html='<div id="search"><input class="form-input" type="text"><a>search</a></div>',this.id="#search",this.opts=$.extend({},e.STATE,t)}return e.STATE={},e.prototype.main=function(){var e=this.opts,t=this,n=$("#search>a").attr("href"),r=$("#search>input");r.blur(function(){var e=r.val(),t=n+e;$("#search>a").attr("href",t)}),r.focus(function(e){$("body").keydown(function(e){if(e.keyCode==13){var t=r.val(),i=n+t;window.location.href=i}})})},e.prototype.render=function(){var e=this.opts},e}),function(e){typeof define=="function"&&define.amd?(requirejs.config({paths:{add:"../tools/addmodule"}}),define("G_category",["add"],e)):e(jQuery)}(function(e){function t(e){this.html='	<nav id="category" class="inFLeft inmarRight-2">		<a href="/movie" class="selected">首页</a>		<a href="/movie?category=科幻">科幻</a>		<a href="/movie?category=喜剧">喜剧</a>		<a href="/movie?category=惊悚">惊悚</a>		<a href="/movie?category=剧情">剧情</a>		<a href="/movie?category=励志">励志</a>		<a href="/movie?category=武侠">武侠</a>		<a href="/movie?category=动画">动画</a>	</nav>',this.id="#category",this.opts=$.extend({},t.STATE,e)}return t.STATE={},t.prototype.main=function(){var e=this.opts,t=this},t.prototype.render=function(){var e=this.opts},t}),function(e){typeof define=="function"&&define.amd?(requirejs.config({paths:{add:"../tools/addmodule"}}),define("G_booklist2",["add"],e)):e(jQuery)}(function(e){function t(e){this.html='<section id="booklist2">	<table>		<thead>			<tr><th>书名</th><th>作者</th><th>价格</th><th>发布日期</th><th>访问量</th><th>查看</th><th>更新</th><th>删除</th></tr>		</thead>		<tbody>			<tr><td>aaa</td><td>aaa</td><td>aaa</td><td>aaa</td><td>0</td><td><a>查看</a></td><td><a>修改</a></td><td><button>删除</button></td></tr>		</tbody>	</table></section>',this.id="#booklist2",this.opts=$.extend({},t.STATE,e)}return t.STATE={},t.prototype.main=function(){var e=this.opts,t=this;$("#booklist2>table>tbody>tr>td>button").click(function(e){var t=$(this).parent("td").siblings("td").eq(0),n=t.text();$.post("/ajax/book/booklist2/delete",{title:n},function(e){e[0].status=="success"&&(alert("success"),t.parent().remove())},"json")})},t.prototype.render=function(){var e=this.opts},t}),function(e){typeof define=="function"&&define.amd?(requirejs.config({paths:{add:"../tools/addmodule",G_search:"../G_search/G_search",G_category:"../G_category/G_category",G_booklist2:"../P_book/G_booklist2"}}),define("P_booktable",["add","G_search","G_category","G_booklist2"],e)):e(jQuery)}(function(e,t,n,r){function i(e){this.html="",this.id="#booktable",this.opts=$.extend({},i.STATE,e)}i.STATE={},i.prototype.main=function(){var e=this.opts,t=this},i.prototype.render=function(){var e=this.opts},$.fn.addModule($("body"),"P_booktable",i),$.fn.addModule($("#insert_search"),"G_search",t),$.fn.addModule($("#insert_category"),"G_category",n),$.fn.addModule($("#insert_booklist2"),"G_booklist2",r)});
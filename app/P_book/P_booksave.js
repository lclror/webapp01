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
function P_booksave(opts){
this.html='';

this.id='#booksave' 				
this.opts=$.extend({},P_booksave.STATE,opts)
}

P_booksave.STATE={
	//state : 'off',
}

P_booksave.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~

$("#booksave>form>button").click(function(e) {
	if($("#booksave>form>input:eq(2)").val()==''){alert('标题不能为空')}else{
	var tag_array=[] //每次都从新定义，为了清空.
	//~~~~~~~~~add tag category~~~~~~~~~~~~~~~~~~~~
	$("#booksave>ul>li.selected").each(function(index, element) {
		tag_array.push($(this).text())
	});
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var $input=$("#booksave>form>input")
	//if($input.val()==''){alert('内容不能为空')}else{}
	var nav=$("#booksave>nav").text()
	
	var id=$input.eq(0).val()
	var image=$input.eq(1).val()
	var title=$input.eq(2).val()
	var author=$input.eq(3).val()
	var publisher=$input.eq(4).val()
	var ISBN=$input.eq(5).val()
	
	var pubdate=$input.eq(6).val()
	var pages=$input.eq(7).val()
	var binding=$input.eq(8).val()
	var price=$input.eq(9).val()
	
	var summary=$("#booksave>form>textarea").eq(0).val()
	var author_intro=$("#booksave>form>textarea").eq(1).val()
	var catalog=$("#booksave>form>textarea").eq(2).val()
	//var posters_file=$input.eq(2)[0].files[0] //加入文件上传
	//var category={tag:null}; category.tag=tag_array
	var category=tag_array
	//console.log(category)
	//~~formdata 是为了加入文件上传所做的结构改动~~~~~~~~
	var formdata=new FormData()
	formdata.append('nav',nav)
	
	formdata.append('id',id)
	formdata.append('image',image)
	formdata.append('title',title)
	formdata.append('author',author)
	formdata.append('publisher',publisher)
	formdata.append('ISBN',ISBN)
	
	formdata.append('pubdate',pubdate)
	formdata.append('pages',pages)
	formdata.append('binding',binding)
	formdata.append('price',price)
	
	formdata.append('summary',summary)
	formdata.append('author_intro',author_intro)
	formdata.append('catalog',catalog)
	
	formdata.append('category',category) //到这里时它不是一个数组了
	//formdata.append('posters_file',posters_file)
	console.log(formdata)
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$.ajax({
		url:'/ajax/book/admin/save',	
		type:'POST',
		cache:false,
		data:formdata,
		processData:false,
		contentType:false,
		dataType:"json"
		
	}).done(function(result){
		alert(result.status)	
		$("#booksave>form>input").val(null)
		$("#booksave>form>textarea").val(null)
		$("#booksave>nav").text(null)
		$("#booksave>ul>li").removeClass("selected")
	}).fail(function(result){
		alert(result.status)	
	})
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	}
});
}

//~~~~加入标签按钮 选择功能~~
$("#booksave>ul>li").click(function(e) {
	$(this).toggleClass("selected")
});

//~~~~加入jsonp的Ajax请求  去获取豆瓣电影信息~~~~~~~~~~~~~~~~~~
$("#booksave>button.btn1").click(function(e) {
	var api_id=$("#booksave>input.input1").val()
	if(api_id){
		$.ajax({
			dataType:'jsonp',
			url:'https://api.douban.com/v2/book/'+api_id,
			cache:true,
			type:'get',
			crossDomain:true,
			//jsonp:'callback',
			jsonpCallback:'jsonp_callback',
			success:function(date_json){
				//alert(date_json)
				var id=date_json.id
				var image=date_json.images.large
				var title=date_json.title
				var author=date_json.author[0]
				var publisher=date_json.publisher
				var ISBN=date_json.isbn13
				
				var pubdate=date_json.pubdate
				var pages=date_json.pages
				var binding=date_json.binding
				var price=date_json.price
				
				var summary=date_json.summary 
				var author_intro=date_json.author_intro 
				var catalog=date_json.catalog 
				//alert(title+' , '+posters+' , '+director+' , '+year+' , '+descrtion+' , '+country)
				var $input=$("#booksave>form>input")
				$input.eq(0).val(id)
				$input.eq(1).val(image)
				$input.eq(2).val(title)
				$input.eq(3).val(author)
				$input.eq(4).val(publisher)
				$input.eq(5).val(ISBN)
				
				$input.eq(6).val(pubdate)
				$input.eq(7).val(pages)
				$input.eq(8).val(binding)
				$input.eq(9).val(price)				

				$("#booksave>form>textarea").eq(0).val(summary)
				$("#booksave>form>textarea").eq(1).val(author_intro)
				$("#booksave>form>textarea").eq(2).val(catalog)
			}
		})	
	}else{
		alert('id不能为空')	
	}
});

//~~~~~~~~~~~~~~~~~~~~~~



P_booksave.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~
/*var tag_array=['励志','动作','武侠']
$("#booksave>ul>button").click(function(){
	$("#booksave>ul>li").each(function(i, elm) {
		var $this_li=$(this)
		var li_text=$this_li.text()
		for(var i in tag_array){
			var tag_text=	tag_array[i]
			if(li_text==tag_text){
				$this_li.addClass("selected")	
			}
		}
	});	
})
*/
//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'P_booksave',P_booksave) 
//return P_booksave;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
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

$("#adminIn>form>button").click(function(e) {
	var tag_array=[] //每次都从新定义，为了清空.
	//~~~~~~~~~add tag category~~~~~~~~~~~~~~~~~~~~
	$("#adminIn>ul>li.selected").each(function(index, element) {
		tag_array.push($(this).text())
	});
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var $input=$("#adminIn>form>input")
	//if($input.val()==''){alert('内容不能为空')}else{}
	var nav=$("#adminIn>nav").text()
	var title=$input.eq(0).val()
	var posters=$input.eq(1).val()
	var posters_file=$input.eq(2)[0].files[0] //加入文件上传
	var director=$input.eq(3).val()
	var country=$input.eq(4).val()
	var language=$input.eq(5).val()
	var year=$input.eq(6).val()
	var sourse=$input.eq(7).val()
	var descrtion=$("#adminIn>form>textarea").val()
	//var category={tag:null}; category.tag=tag_array
	var category=tag_array
	//console.log(category)
	//~~formdata 是为了加入文件上传所做的结构改动~~~~~~~~
	var formdata=new FormData()
	formdata.append('nav',nav)
	formdata.append('title',title)
	formdata.append('posters',posters)
	formdata.append('posters_file',posters_file)
	formdata.append('director',director)
	formdata.append('country',country)
	formdata.append('language',language)
	formdata.append('year',year)
	formdata.append('sourse',sourse)
	formdata.append('descrtion',descrtion)
	formdata.append('category',category) //到这里时它不是一个数组了
	console.log(formdata)
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$.ajax({
		url:'/ajax/movie/admin/save',	
		type:'POST',
		cache:false,
		data:formdata,
		processData:false,
		contentType:false,
		dataType:"json"
		
	}).done(function(result){
		alert(result.status)	
		$("#adminIn>form>input").val(null)
		$("#adminIn>form>textarea").val(null)
		$("#adminIn>nav").text(null)
		$("#adminIn>ul>li").removeClass("selected")
	}).fail(function(result){
		alert(result.status)	
	})
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*	$.post('/ajax/movie/admin/save',
		{
		nav:nav,
		title:title,
		posters:posters,
		director:director,
		country:country,
		language:language,
		year:year,
		sourse:sourse,
		descrtion:descrtion,
		category:category
		
		},function(result){
			alert(result.status)	
			$("#adminIn>form>input").val(null)
			$("#adminIn>form>textarea").val(null)
			$("#adminIn>nav").text(null)
			$("#adminIn>ul>li").removeClass("selected")
		},'json')
*/	
});
//~~~~加入标签按钮 选择功能~~
$("#adminIn>ul>li").click(function(e) {
	$(this).toggleClass("selected")
});

//~~~~加入jsonp的Ajax请求  去获取豆瓣电影信息~~~~~~~~~~~~~~~~~~
$("#adminIn>button.btn1").click(function(e) {
	var api_id=$("#adminIn>input.input1").val()
	if(api_id){
		$.ajax({
			dataType:'jsonp',
			url:'https://api.douban.com/v2/movie/subject/'+api_id,
			cache:true,
			type:'get',
			crossDomain:true,
			//jsonp:'callback',
			jsonpCallback:'jsonp_callback',
			success:function(date_json){
				//alert(date_json)
				var title=date_json.title
				var posters=date_json.images.large
				var director=date_json.directors[0].name
				var country=date_json.countries[0]
				//var language='英语'
				var year=date_json.year
				//var sourse=date_json.sourse
				var descrtion=date_json.summary 
				//alert(title+' , '+posters+' , '+director+' , '+year+' , '+descrtion+' , '+country)
				var $input=$("#adminIn>form>input")
				$input.eq(0).val(title)
				$input.eq(1).val(posters)
				$input.eq(2).val(director)
				$input.eq(3).val(country)
				//$input.eq(4).val(language)
				$input.eq(5).val(year)
				//$input.eq(6).val(sourse)
				$("#adminIn>form>textarea").val(descrtion)
			}
		})	
	}else{
		alert('id不能为空')	
	}
});

//~~~~~~~~~~~~~~~~~~~~~~
}


P_adminIn.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~
/*var tag_array=['励志','动作','武侠']
$("#adminIn>ul>button").click(function(){
	$("#adminIn>ul>li").each(function(i, elm) {
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
$.fn.addModule($('body'),'P_adminIn',P_adminIn) 
//return P_adminIn;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
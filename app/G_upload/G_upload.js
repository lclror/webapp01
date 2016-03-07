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
function G_upload(opts){
this.html='\
<section id="upload01">\
	<form id="formupload01" enctype="multipart/form-data">\
		<h1>form tag handle-ajax</h1>\
		<input type="text" name="text" value="test">\
		<input id="file" type="file" name="kkk"/><br/>\
		<button id="upload" type="button">upload</button>\
	</form>\
	<h1>div tag upload handle-ajax</h1>\
	<div id="divupload01">\
		<input type="file" name="kkk"><br/>\
		<button type="button">upload</button>\
	</div>\
	<h1>form tag handle-common page tag</h1>\
	<form id="formupload02" enctype="multipart/form-data" action="/upload01" method="post">\
		<input type="text" name="text" value="test"><br/>\
		<input id="file" type="file" name="kkk"/><br/>\
		<button id="upload" type="submit">upload</button>\
	</form>\
</section>\
';

this.id='#upload01' //不能为空，为空的话就添加不上html了，因为空也是作为一个子元素而存在。				
this.opts=$.extend({},G_upload.STATE,opts)
}

G_upload.STATE={
	//loginstate : 'off',
}

G_upload.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
$("#formupload01>button").click(function(e) {
	var $parent=$(this).parent().parent()
	$.ajax({
		 url: '/upload01',
		 type: 'POST',
		 cache: false,
		 data: new FormData($('#formupload01')[0]),
		 processData: false,
		 contentType: false
	}).done(function(res) {
		if(res.error){alert(res.error)}
		
		var imgpath=res.path
		var src='../'+imgpath
		var img='<img src='+src+' alt="test">'
		$parent.append(img)
		$("#formupload01>input:eq(1)").val(null)
	}).fail(function(res) {
		alert(res.asdf)	
	});
  
});


//div upload test file 即不通过表单标签来上传文件的脚本操作方法,相比纯页面操作更具灵活性.
$("#divupload01>button").click(function(e) {
	var formData=new FormData()
	formData.append('kkk',$('#divupload01>input[type=file]')[0].files[0])
	formData.append('ccc','hello world !')
	//console.log(formData)
	//formData['ccc']='hello ccc' //此种方法不行
	$.ajax({
		url:'/upload01',
		type:'POST',
		cache:false,
		/* //此种方法不能用，如果要加入文件上传功能的话.
		data:{
			kkk:formData.kkk,
			ccc:formData.ccc
		},*/
		//这样一来必须把所有的其他键值对都写入到formData中去，然后把formData整体上传过去.
		data:formData, 
		processData:false,
		contentType:false	
	}).done(function(res){
		if(res.error){alert(res.error)}
		//alert(res.path)	
		var imgpath=res.path
		var src='../'+imgpath
		var img='<img src='+src+' alt="test">'
		$("body").append(img)
		$("#upload01>input:eq(1)").val(null)
		
	}).fail(function(res){alert(res.asdf)})
	
});

//~~~~~~~~~~~~~~~~~~~~~~
}


G_upload.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'G_upload',G_upload) //修改模块用
//return G_upload;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))
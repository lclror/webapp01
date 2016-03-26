var multer  = require('multer')
var upload = multer({ dest: './G_upload/img' })

function ajax(app1){
//~~~~~~~~~~
//此处的single()括号内的名字需要与表单中的input属性中name的名字相同，否则报错。
//只要上面的写对，用源生的表单标签提交也可以成功。
app1.post('/upload01',upload.single('kkk'),function(req, res, next){
		console.log(req.body.ccc)
        console.log(req.file);//此处打印文件信息必须是req.file  如果是多个文件就是 req.files 。
		  //可以通过req.file.fieldname是否等于空来判断对错.
    //res.redirect('/upload01');
	 if(req.file.size>=20000){
		 res.send({error:'img size overflow 2M',path:req.file.path})
	 }else{
		 res.send({path:req.file.path})	 
	 }
	 
	 //next()
	
})	
//~~~~~~~~~~
}
exports.ajax=ajax
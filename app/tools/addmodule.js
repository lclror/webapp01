;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {		
		define( [''], factory );		
	} else {factory( jQuery )}
}(function() {
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

$.fn.addModule=function(insetWhereDOMobject,modelName,modelFile,modelFileOpts){
	var modelName=new modelFile(modelFileOpts)
//通过判断父容器中是否已经存在了相同的模块，如果存在就不在添加html 而只添加它的脚本，否则就是为空当然要都添加进去了，这样是为了与服务器渲染页兼容，不再出现两个相同模块.	
	if(insetWhereDOMobject.children(modelName.id).length==0){ 
		insetWhereDOMobject.append(modelName.html)
		setTimeout(function(){
		modelName.main()   
		modelName.render()  
		},5)	
	}else{
		setTimeout(function(){
		modelName.main()   
		modelName.render()  
		},5)
	}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
}))
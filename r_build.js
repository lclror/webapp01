({
	appDir: 'app1',    //app目录为r.js要处理优化的根目录
	baseUrl:'P_book',  //从app 目录下索引一个存放requirejs模块的文件夹叫P_xxx.
	//optimizeCss:'standard.keepComments.keepLines', 
	optimizeCss:'standard',
	//处理.CSS文件合并用，保留注释与换行，但会去掉每一行的缩进
	removeCombined: true,
	//合并完成后，即把那些依赖的模块给删除
	dir: 'dist', //优化后的总目录，发布目录
	
	paths:{
		//'module01':'../plugin/module01',   
		//假如module01 这个模块不在P_xxx中，就需要在这里注册出它的地址，否则就不用， 但采用平行依赖模块的话，每一个模块都要在这里注册。
				add:'../tools/addmodule',
				G_category:'../G_category/G_category',
				G_comment:'../G_comment/G_comment2',
				G_login:'../G_login/G_login',
				G_pageing:'../G_pageing/G_pageing',
				G_search:'../G_search/G_search',
				G_upload:'../G_upload/G_upload',
				G_lunbo:'../G_lunbo/G_lunbo',
				
				//G_booklist:'../P_book/G_booklist',
				//G_booklist2:'../P_book/G_booklist2',
				
				
		
	},
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	modules: [
        //{name: ''},  
		  //这里是总模块，即需要最终优化出来的模块的名字所在
		  //位置，或者说是data-main='' 那个模块，把所有它所依赖的模块的内容都写到它一个页面内，即优化完成
		  //此时不在发起多余的头部文件请求
		  //这也是模块，也要在paths中注册它所在的文件位置.
		  {name: 'P_book'},
		  {name: 'P_bookdetails'},
		  {name: 'P_booksave'},
		  {name: 'P_booktable'},
    ],
	 
	
})
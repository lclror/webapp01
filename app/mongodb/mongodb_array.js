var mongoskin=require('mongoskin')

var userName = ''+':',
    password = ''+'@', 
	 host = 'localhost',
    port = '27017',
    dbName = 'array',
    
    str = 'mongodb://' +host+':'+port+'/'+dbName;

var options={native_parser: true}	 

var db = mongoskin.db(str,options);
//直接把链接到的数据库返回比较好，如果把某些数据库操作方法写死的话，有些时候不太灵活.


module.exports=db
//exports.db=db;

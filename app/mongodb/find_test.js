var mongoskin=require('mongoskin')
var mongodb_array=require('./mongodb_array')
var coll_test01=mongodb_array.collection('test01')
// 配置项中的upsert 是执行插入操作,默认为false，当一条数据查不到时，就把它当做新的数据插入集中.
var ObjectId=mongoskin.ObjectId

var tag_obj={
	name:'kkk05',
	age:40	
}
/*coll_test01.findAndModify(
	{_id:ObjectId('56ca7fd08d0b05673bc28e95')},
	[],
	{$push:{tag:tag_obj}},
	//{new:true,upsert:true},
	function(error,result){
    console.log('=======>', error, result);
});*/

/*coll_test01.findAndModify(
	{_id:ObjectId('56ca7fd08d0b05673bc28e95'),'tag.name':'steve'},
	[],
	{$unset:{'tag.$.age':30}},
	//{new:true,upsert:true},
	function(error,result){
    console.log('=======>', error, result);
});*/

coll_test01.find().count(function(err,result){
	console.log(typeof result)	
})

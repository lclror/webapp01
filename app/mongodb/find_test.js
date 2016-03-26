var mongoskin=require('mongoskin')
var mongodb_array=require('./mongodb_array')
var ObjectId=mongoskin.ObjectId
//var coll_test01=mongodb_array.collection('test01')
// 配置项中的upsert 是执行插入操作,默认为false，当一条数据查不到时，就把它当做新的数据插入集中.


/*var tag_obj={
	name:'kkk05',
	age:40	
}*/
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

/*coll_test01.find().count(function(err,result){
	console.log(typeof result)	
})*/

var coll_booklist=mongodb_array.collection('booklist')

var booklist_obj={
	title:"满月之夜白鲸现",
	author: "[日] 片山恭一",
	image:"https://img1.doubanio.com\/lpic\/s1747553.jpg",
	summary:"那一年，是听莫扎特、钓鲈鱼和家庭破裂的一年。说到家庭破裂，母亲怪自己当初没有找到好男人，父亲则认为当时是被狐狸精迷住了眼，失常的是母亲，但出问题的是父亲……。",
	binding:"平装",
	publisher:"青岛出版社",
	pubdate:"2005-01-01",
	price:"18.00元",
	pages:"180",
	tags:['小说','文学']	
}

coll_booklist.save(booklist_obj,function(err,result){
	console.log(result.result)	
})

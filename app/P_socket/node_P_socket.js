
function socket(io){
	//socket部分
	var userArray=[]
	io.on('connection', function(socket) {
		//~userlogin part~把昵称push进数组 ~~~~~~~
		socket.on('userLogin',function(username){
			var existed=userArray.indexOf(username)
			if(existed==0){
				socket.emit('userLogin','error')
			}else if(existed==-1){
				socket.userIndex=userArray.length
				socket.username=username
				userArray.push(username)
				socket.emit('userLogin','success')
				console.log('array= '+userArray)
				io.sockets.emit('userLogin_g', '新用户进入 ： '+username, socket.userIndex); //向所有连接到服务器的客户端发送当前登陆用户的昵称 
			}
		})
		//~~char part~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		 socket.on('char', function(msg,color) {
			  //将消息输出到控制台
			  //console.log('node from : '+data);
			  //向其他人发送信息，不发给自己。
			  //socket.broadcast.emit('char_g', socket.username+' : '+data) 
			  //向所有人发送
			  io.sockets.emit('char_g', socket.username,msg,color) 
		 })
	
		//断开连接的事件~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		socket.on('disconnect', function() {
			 //将断开连接的用户从users中删除
			 
			 userArray.splice(socket.userIndex, 1);
			 console.log('array= '+userArray)
			 //通知除自己以外的所有人
			 //socket.broadcast.emit('userLogin_g', '用户 '+socket.username+'离开',socket.userIndex);
			 io.sockets.emit('userLogin_g', '用户 '+socket.username+'离开', userArray.length-1);
			 
		});	
		 
		 
	});

}
exports.socket=socket



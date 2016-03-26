var html='\
<div id="lunbo">\
           <ul class="">\
              <i class="kkleft myleft"></i> <i class="kkright myright"></i>\
           </ul>\
           <ul class="inFLeft">\
              <span></span>\
              <span></span>\
              <span></span>\
              <span></span>\
              <span></span>\
           </ul>\
           <ul id="sport" class="inFLeft">\
              <a><div>活动页面 one  <br/>Please insert the activity page</div></a>\
              <a><div>活动页面 two  <br/>Please insert the activity page</div></a>\
              <a><div>活动页面 three<br/>Please insert the activity page</div></a>\
              <a><div>活动页面 four <br/>Please insert the activity page</div></a>\
              <a><div>活动页面 five <br/>Please insert the activity page</div></a>\
           </ul>\
 </div>\
';

function process(parent){
	parent.html(html)
	var pro=function(req,res,next){
		
		
	next()}
	return pro;	
}
exports.process=process
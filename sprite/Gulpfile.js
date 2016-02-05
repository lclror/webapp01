var gulp=require('gulp')
var compass=require('gulp-compass')

gulp.task('sprite01',function(){
	gulp.src('sprite01/home.scss')
		.pipe(compass({
			comments: false,
			css:'sprite01',
			sass:'sprite01',
			image:'sprite01',	
		}))
})



/*  home.scss 文件内容
@import 'compass/utilities/sprites';
@import 'home/*.png';   
@include all-home-sprites;  

sprite01 文件夹为起始路径，home 文件夹是在它之内*/
/*all后跟的home 与上面的 home文件夹 名字要一样之内*/
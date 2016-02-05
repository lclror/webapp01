var gulp=require('gulp')
var autoprefixer=require('autoprefixer')

gulp.task('autoprefixer',function(){
	gulp.src('../app/G_xxx/G_xxx.css')
	.pipe(autoprefixer({
		browsers:[],
	}))
	.pipe(gulp.dest('../app/G_xxx'))	 
})
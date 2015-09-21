//carregar gulp
var gulp = require("gulp");
var gulpLess = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();


//task para compilar o less
gulp.task("less", function () {
    
    return gulp.src('src/index.less')
        .pipe(gulpLess())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src'));
});


//task para atualizar o browser 
gulp.task("watch", ['less'], function () {
    
//gulp atualiza toda vez que em qualquer diretorio, qualquer arquivo de less for alterado - no caso temos o variables e o index
    gulp.watch('src/**/*.less', ["less"]);
    gulp.watch(['src/**/*.css', 'src/**/*.html'], function () {
        browserSync.reload();
    });

});

//browser-sync
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });

});

gulp.task('develop', ['watch', 'browser-sync']);

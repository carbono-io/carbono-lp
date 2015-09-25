//carregar gulp
var gulp           = require("gulp");
var gulpLess       = require("gulp-less");
var gulpSize       = require('gulp-size');
var gulpIf         = require('gulp-if');
var gulpStripDebug = require('gulp-strip-debug');
var gulpImagemin   = require('gulp-imagemin');
var autoprefixer   = require('gulp-autoprefixer');
var browserSync    = require('browser-sync').create();

var mergeStream = require('merge-stream');
var runSequence = require('run-sequence');

var polybuild = require('polybuild');

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

gulp.task('copy:images', function () {
    return gulp.src('src/img/**/*')
        .pipe(gulpImagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('copy', ['copy:images'], function () {
    var copyFiles = [
        'src/locales/**/*',
    ];

    return gulp.src(copyFiles, { base: 'src' })
        .pipe(gulp.dest('dist'));
});

gulp.task('polybuild', function () {
    return gulp.src('src/index.html')
        // maximumCrush should uglify the js
        .pipe(polybuild({ maximumCrush: true }))
        .pipe(gulpSize({
            title: 'build:distribute',
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('strip-debug', ['polybuild'], function () {
    gulp.src('dist/index.build.js')
        .pipe(gulpStripDebug())
        .pipe(gulp.dest('dist'));
});

// distribute
gulp.task('distribute', function () {
    return runSequence(['polybuild', 'copy'], 'strip-debug');
});

gulp.task('serve:dist', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
})

gulp.task('develop', ['watch', 'browser-sync']);
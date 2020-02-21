var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var uncss = require('gulp-uncss-sp');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');
var csslint = require('gulp-csslint');
var useref = require('gulp-useref');
var htmlhint = require("gulp-htmlhint");
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify-es').default;
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    browserSync.watch("app",browserSync.reload)
});

gulp.task('workjs:dev', async function()  {
         gulp.src('dist/js/**/*.js')
         .pipe(eslint({fix:true}))
         .pipe(eslint.format())
         .pipe(gulp.dest('dist/js'));
});

gulp.task('workcss:dev',async function() {
     gulp.src('dist/css/**/*.css')
     .pipe(csscomb())
     .pipe(gulp.dest('dist/css/'))
      .pipe(csslint())
      .pipe(csslint.formatter());
});

gulp.task('workhtml:dev',async function() {
        gulp.src('dist/**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});

gulp.task('workjs',async function() {
    gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))

});
gulp.task('babel', async function() {
        gulp.src('dist/js/*.js')
            .pipe(babel())
            .pipe(gulp.dest('dist/js/test/src'))
    }
);
gulp.task('workhtml',async function() {
    gulp.src('dist/**/*.html')
        .pipe(useref())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('app'));
});

gulp.task('workcss',async function() {
        gulp.src('./app/css/*.css')
        .pipe(uncss({
            html: ['app/index.html']
        }))
        .pipe(autoprefixer())
        .pipe(csso({
            debug: true
        }))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('comb', gulp.parallel('workhtml:dev', 'workcss:dev','workjs:dev'));

gulp.task('watch', async function() {
    gulp.watch('dist/**/*.html',gulp.series('workhtml'));
    gulp.watch('dist/css/**/*.css',gulp.series('workhtml','workcss'));
    gulp.watch('dist/js/*.js',gulp.series('workjs','babel'));
    // gulp.watch('dist/js/*.js',gulp.series('babel'))

});

gulp.task("default",gulp.series(
     gulp.parallel("watch","serve")
));

gulp.task("start",gulp.series('workhtml','workcss','workjs'));



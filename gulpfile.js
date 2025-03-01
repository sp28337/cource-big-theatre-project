/*                OLD WAY

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const webp = require("gulp-webp");
const browserSync = require("browser-sync").create();

gulp.task("css", function () {
    return gulp.src("./scss/style.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css"));
})

gulp.task("server", function () {
    browserSync.init({
        server: {baseDir: "./"}
    });
});


gulp.task("reload", function (done) {
    browserSync.reload();
    done();
});


gulp.task("webp", function () {
    return gulp.src("img/*.{png, jpg, jpeg}")
        .pipe(webp())
        .pipe(gulp.dest("dest"));
});

gulp.watch("scss/**//*.{scss, sass}", gulp.series("css", "reload"));
gulp.watch("*.html", gulp.series("reload"));

gulp.task("start", gulp.series("css", "server")); 
*/

const { series, dest, watch, src } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();

function css() {
    return src("./scss/style.scss")
    .pipe(sass().on("error", sass.logError))
        .pipe(dest("./css"));
}

function server() {
    browserSync.init({
        server: {baseDir: "./"}
    });
}

function reload(cb) {
    browserSync.reload();
    cb();
}

function webpTask() {
    return src("img/*.{png,jpg,jpeg}")
        .pipe(webp())
        .pipe(dest("dist/img"));
}

watch("scss/**//*.{scss, sass}", series(css, reload));
watch("*.html", reload);

exports.css = css;
exports.server = server;
exports.webpTask = webpTask;
exports.start = series(css, server);

const { series, dest, watch, src } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');

function css() {
    return src("./scss/style.scss")
    .pipe(sass().on("error", sass.logError))
        .pipe(dest("./dist/css"));
}

function server() {
    browserSync.init({
        server: {baseDir: "./dist"}
    });
}

function reload(cb) {
    browserSync.reload();
    cb();
}

function webpTask() {
    return src("img/*.{jpg,jpeg}")
        .pipe(webp())
        .pipe(dest("dist/img"));
}

function svg() {
    return src('img/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../sprite.svg"
            }}    
        })
    ).pipe(dest('dist/img/icons'));
}

function html() {
    return src("*.html")
    .pipe(dest("dist"))
}

function js() {
    return src("js/*.js")
    .pipe(dest("dist/js"))
}

function copyUtils() {
    return src(["../node_modules/swiper/**/*",
        "./js/bootstrap.bundle.js",
        "./css/bootstrap.css"

    // Файлы bootstrap если подключали их локально
    ])
    .pipe(dest("dist/utils"))
}

function fontCopy() {
    return src("fonts/*.{woff,woff2}")
    .pipe(dest("dist/fonts"))
}

watch("scss/**/*.{scss, sass}", series(css, reload));
watch("*.html", series(html, reload));
watch("js/*.js", series(js, reload));

exports.svg = svg
exports.css = css;
exports.server = server;
exports.webpTask = webpTask;

exports.build = series(css, html, webpTask, js, copyUtils, fontCopy)
exports.start = series(server);

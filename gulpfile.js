const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
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

gulp.watch("scss/**/*.{scss, sass}", gulp.series("css", "reload"));
gulp.watch("*.html", gulp.series("reload"));

gulp.task("start", gulp.series("css", "server"));

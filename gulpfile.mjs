import gulp from "gulp";
import imagemin from "gulp-imagemin";
import mozjpeg from "imagemin-mozjpeg";
import optipng from "imagemin-optipng";
import svgo from "imagemin-svgo";
import del from "del";

// Clean the images folder
function clean() {
    return del(["dist/images"]);
}

// Optimize images
function images() {
    return gulp.src("src/assets/images/**/*.{png,jpg,jpeg,svg,gif}")
        .pipe(imagemin([
            mozjpeg({ quality: 75, progressive: true }),
            optipng({ optimizationLevel: 5 }),
            svgo({ plugins: [{ removeViewBox: false }] })
        ]))
        .pipe(gulp.dest("dist/images"));
}

// Watch files
function watchFiles() {
    gulp.watch("src/assets/images/**/*.{png,jpg,jpeg,svg,gif}", images);
}

// Register Gulp tasks
export { clean, images, watchFiles as watch };
export default gulp.series(clean, images);

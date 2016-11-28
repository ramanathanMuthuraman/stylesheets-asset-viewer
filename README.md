# stylesheets-asset-viewer

A PostCSS plugin to parse the assets used in stylesheets

## Installation

```bash
npm install --save stylesheets-asset-viewer
```

## Usage

This plugin will return a html file with table containing the stylesheets and assets used
Sample output [result.html](http://rawgit.com/ramanathanmuthuraman/stylesheets-asset-viewer/master/result.html)


```js

var postcss = require('postcss');
var globby = require('globby');
var fs = require('fs');
var stylesheetsAssetViewer = require('stylesheets-asset-viewer');

globby(['./style/*.css']).then(paths => {
    paths.forEach(path =>
    	postcss([stylesheetsAssetViewer])
		  .process(fs.readFileSync(path,'utf8')).css);
	});
});

```

## Usage With Gulp

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var stylesheetsAssetViewer = require('stylesheets-asset-viewer');

gulp.task('stylesheets-asset-viewer-sample-task', function () {
  return gulp.src('./style/*.css')
    .pipe(postcss([stylesheetsAssetViewer()]));
});

gulp.task("default", ["stylesheets-asset-viewer-sample-task"]);
```

## License

MIT


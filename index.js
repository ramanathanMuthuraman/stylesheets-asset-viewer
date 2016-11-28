var postcss = require('postcss');
var tableify = require('tableify');
var fs = require('fs-extra');
var postcss = require('postcss');

module.exports = postcss.plugin('assets-parser', function(options) {

	options = options || {};
	options.dir = options.dir||'.';
	options.fileName = options.fileName || "result.html";
	var pathToOuputFile =options.dir+"/"+options.fileName;

	var styleSheets = [];
	var regularExpression = {
		urlExtractor : /url\((.*)\)/
	};

	return function (css) {
		var item = {};
		item['URL/Number of the stylesheet'] = css.source.input.file||(1+styleSheets.length);
		item['Selector with background'] = {};
		css.walkDecls(/^background/,function (decl) {
			decl.parent.selector.split(",").forEach(function(selector){
				item['Selector with background'][selector] = decl.value.match(regularExpression.urlExtractor)[1];
			});
		});
		styleSheets.push(item);
		fs.outputFile(pathToOuputFile,tableify(styleSheets));
    };
});
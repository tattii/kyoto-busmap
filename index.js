var express = require('express');
var app = express();

var http = require('http');
var Iconv = require('iconv').Iconv;

app.set('port', (process.env.PORT || 5001));
app.use(express.static(__dirname + '/public'));
app.use('/components', express.static(__dirname + '/components'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
  res.send('Hello World!');
});


app.get("/blclnt", function(req, res) {
	var url = "http://blsetup.city.kyoto.jp/cgi-bin/blclnt.cgi?=" + req.param("line");
	http.get(url, function(blclnt) {
		blclnt.on('data', function (chunk) {
			var iconv = new Iconv('Shift-JIS', 'UTF-8//TRANSLIT//IGNORE');
			text = iconv.convert(chunk).toString();

			res.setHeader("Content-Type", "text/plain");
			res.send(text);
		});

	}).on('error', function(e) {
		res.send("error: " + e.message);
	});
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

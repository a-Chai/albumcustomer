var express = require('express');
var app = express();
var path = require("path");

app.use("/css", express.static(__dirname + '/www/css'));
app.use("/js", express.static(__dirname + '/www/js'));
app.use("/icons", express.static(__dirname + '/www/icons'));
app.use("/images", express.static(__dirname + '/images'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/www/index.html'));
});

app.listen(process.env.PORT);
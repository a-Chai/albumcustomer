"use strict";
const spawn = require('child_process').spawn;
const fs = require('fs');
const cheerio = require('cheerio');
const repl = require('repl');
const request = require('request');


{
  const phantomjs = spawn('phantomjs', ['crawler.js']);
  
  phantomjs.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
  function download (uri, filename){
    request.head(uri, (err, res, body) => {
      if (err) throw err;
      request(uri).pipe(fs.createWriteStream(filename));
    });
  };
  
  phantomjs.on('close', (code) => {
    console.log("");
    console.log("");
    console.log(`child process exited with code ${code}`);
    
    fs.readFile('data.html', 'utf8', (err, data) => {
      if (err) throw err;
      
      let $ = cheerio.load(data);
      let links = [];
      //let replServer = repl.start('> ');
      //replServer.context["$"] = $;
      
      $("em img").each((i, elem) => {
        links.push($(elem).prop("file"));
      });
      
      links.forEach((link, i) => {
        download(link, 'images/' + (i+1) + '.png');
      });
      
    });
  });
}
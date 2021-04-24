const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'content-type': 'text/html' });
  var pathName = url.parse(request.url).pathname;
  console.log(pathName);
  // fs.createReadStream('index.html').pipe(response);
  response.write("Welcome")
  fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
    });
  response.end();
  // changing the filename just loads a different, static, html file
  // trying to load simulation.html like this doesn't allow the map to show
})

server.listen(8080, function() {
  console.log("Node app is running at localhost:" + 8080)
});

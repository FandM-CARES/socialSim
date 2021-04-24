var http = require('http')
var url = require('url')
var show = require('./show')

http.createServer(onRequest).listen(8888);
console.log('Server has started');

function onRequest(request, response){
  var pathName = url.parse(request.url).pathname
  console.log('pathname' + pathName);
  show.showPage(response, pathName)
}

const http = require('http')
const fs = require('fs')

var filename = 'index.html'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  urlArray = req.url.split(".")
  filetype = urlArray[urlArray.length - 1]
  if(req.url != "/" && req.url != null && filetype != "js" && filetype != "json" && filetype != "py"){
    filename = req.url
    if(req.url.includes("?")){
      urlArray = req.url.split("?")
      urlArray = urlArray[0].split("/")
      filename = urlArray[1]
    }
  }
  // console.log(req.url)
  // console.log(filename)
  fs.createReadStream(filename).pipe(res)
})

server.listen(process.env.PORT || 3000, function() {
  console.log("Node app is running at localhost:" + process.env.PORT)
});

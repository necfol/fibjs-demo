var http = require("http")
var path = require("path")
var fs = require('fs')
var mime = require('mime')
var app = (r) => {
    var dirPath = path.join(__dirname, r.address)
    if(fs.stat(dirPath).isDirectory()) {
        r.response.setHeader({'Content-Type': 'text/html; charset=utf-8'})
        r.response.status = 200
        var files = fs.readdir(dirPath)
        var context = `<ul>`
        files.forEach((item)=>{
            let link = path.join(r.address, item)
            context += `<li><a href="${link}">${item}</a></li>`
        })
        context += `</ul>`
        r.response.write(context)
    } else {
        var file = fs.readFile(dirPath, "utf-8")
        r.response.setHeader({"Content-Type": `${mime.getType(r.address)}; charset=utf-8`})
        r.response.status = 200
        r.response.write(file)
    }
}
var svr = new http.Server(8080, app)
svr.run()
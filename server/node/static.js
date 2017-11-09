const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const child_process = require('child_process')
const mime = require('mime')
var argv = require("minimist")(process.argv.slice(2))
const svr = http.createServer((req, res) => {
    
    var pathname = decodeURI(url.parse(req.url).pathname)
    var dirPath = path.join(__dirname, pathname)
    if(pathname == '/favicon.ico')
        return
    console.log("===========\x1b[32m%s\x1b[0m", `visit @ ${pathname}`)        
    if(fs.statSync(dirPath).isDirectory()) {
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.statusCode = 200
        var files = fs.readdirSync(dirPath)
        var context = `<ul>`
        files.forEach((item) => {
            let link = path.join(pathname, item)
            context += `<li><a href="${link}">${item}</a></li>`
        })
        context += `</ul>`
        res.write(context)
    } else {
        var file = fs.readFileSync(dirPath)
        res.setHeader("Content-Type", `${mime.getType(pathname)};charset=utf-8`)
        res.setHeader("Access-Control-Allow-Origin", "*")        
        res.statusCode = 200
        res.write(file)   
    }
    res.end()
})
svr.listen(argv.p || 8080, '127.0.0.1', () => {
    child_process.exec(`open http://${svr.address().address}:${svr.address().port}`)
})
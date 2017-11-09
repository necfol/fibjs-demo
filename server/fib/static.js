var http = require("http")
var path = require("path")
var fs = require("fs")
var mime = require("mime")
var process = require("process")
var net = require("net")
var s = new net.Socket()
var argv = require("minimist")(process.argv.slice(2))
var app = (r) => {
    r.address = decodeURI(r.address)
    var dirPath = path.join(__dirname, r.address)
    if (r.address === "/favicon.ico")
        return
    try {
        console.log("===========\x1b[32m%s\x1b[0m", `visit @ ${r.address}`)
        if (fs.stat(dirPath).isDirectory()) {
            r.response.setHeader({
                "Content-Type": "text/html; charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            })
            r.response.status = 200
            var files = fs.readdir(dirPath)
            var context = `<ul>`
            files.forEach((item) => {
                let link = path.join(r.address, item)
                context += `<li><a href="${link}">${item}</a></li>`
            })
            context += `</ul>`
            r.response.write(context)
        } else {
            var file = fs.readFile(dirPath)
            r.response.setHeader({
                "Content-Type": `${mime.getType(r.address)}; charset=utf-8`,
                "Access-Control-Allow-Origin": "*"
            })
            r.response.status = 200
            r.response.write(file)
        }
    } catch (error) {
        r.response.write("no file")
    }
}
var svr = new http.Server(argv.p || 8080, app)
// run 异步执行
svr.run((err, result) => {})
process.run("open", [`http://${s.localAddress}:${argv.p || 8080}`])
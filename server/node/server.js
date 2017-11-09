const http = require('http')
const url = require('url')
const querystring = require('querystring')
var delay = (timeout) => {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(true)
        }, timeout);
    })
}
var app = async(req, res) => {
    var path = url.parse(req.url).pathname
    if (path == '/') {
        res.write("hello world")
    }
    if (path == '/query') {
        var queryParams = querystring.parse(url.parse(req.url).query)
        if (queryParams.sleep == 'true') {
            await delay(5000)
            res.write("hello world")
        } else {
            res.write("normal")
        }
    }
    res.end()
}
const svr = http.createServer(app)
svr.listen(8080)
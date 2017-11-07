var http = require("http")
var coroutine = require("coroutine")
var mq = require("mq")
var app = new mq.Routing()
app.get('/', r => r.response.write("hello world"))
app.get('/query', req => {
    if(req.query.sleep == 'true') {
        coroutine.sleep(1000)
        req.response.write("sleep")
    } else {
        req.response.write("normal")
    }    
})
var svr = new http.Server(8080, app)
svr.run()
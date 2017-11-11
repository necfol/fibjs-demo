var http = require('http')
var MD = () => {
    var funcs = []
    var app = (req, res) => {
        var i = 0
        var next = () => {
            var func = funcs[i]
            i++
            if(func) {
                func(req, res, next)
            }
        }
        next()
    }
    app.use = (func) => {
        funcs.push(func)
    }
    return app
}

var app = MD()
function middlewareA(req, res, next) {
    console.log('A中间件前');
    next();
    console.log('A中间件后');
}

function middlewareB(req, res, next) {
    console.log('B中间件前');
    next();
    console.log('B中间件后');
}

function middlewareC(req, res, next) {
    console.log('C中间件前');
    next();
    console.log('C中间件后');
}

app.use(middlewareA)
app.use(middlewareB)
app.use(middlewareC)

// http.createServer(app).listen(8080)
var svr = new http.Server(8080, app)
svr.run()
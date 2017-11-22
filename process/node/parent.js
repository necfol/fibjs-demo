const Process = require('child_process')
const net = require('net')
var child = Process.fork('./child.js')
var svr = net.createServer()
svr.on('connection', (socket) => {
    socket.end('parent...\n')
})
svr.listen(9000, (err, result) => {
    child.send('hello', svr)
})

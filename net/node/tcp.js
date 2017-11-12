const net = require('net')
var nsvr = net.createServer((socket) => {
    socket.on('data', (data) => {
        socket.write('fuck')
    })
    socket.on('error', (err) => {
        console.log(err)
    })
    socket.write('world')
})
nsvr.listen(7777, () => {
    console.log('ok')
})

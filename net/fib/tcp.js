const net = require('net')
var func = (conn) => {
    var data
    while (data = conn.read()) {
        console.log(data.toString())
        conn.write('fuck\n')    
    }
}
var nsvr = new net.TcpServer('7777', func)
nsvr.run((err, result) => {})
console.log('ok')
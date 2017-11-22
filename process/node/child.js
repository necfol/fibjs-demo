process.on('message', (m, svrHandle) => {
    if(m === 'hello') {
        svrHandle.on('connection', (socket) => {
            socket.end('child...\n')
        })        
    }
})
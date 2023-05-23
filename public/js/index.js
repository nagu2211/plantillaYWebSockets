const socket = io();

// front envia msg al back
setInterval(()=> {
    socket.emit('msg_front_back', {
        msg: 'hola mundo desde front',
        user: 'usuario anonimo'
    })
},1000)

// front ataja msg del back
socket.on('msg_back_front', (msg)=>{
    console.log(msg)
})
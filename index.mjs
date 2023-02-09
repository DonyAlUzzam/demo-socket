import express from "express"
import http from 'http'
import * as socketio from 'socket.io'
const port = 8001

const app = express()

const httpServer = http.createServer(app)
const server = new socketio.Server(httpServer, {
    cors:{
        origin:'*',
    }
})
let timeChange
const data = [
    { name: 1, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 2, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 3, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 4, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 5, x: Math.random() * 10, y: Math.random() * 10 },
  ];
server.on('connection', (socket)=>{
    console.log('connected')
    if(timeChange) clearInterval(timeChange)
    console.log("length1", data.length)
   
    // setInterval(()=> socket.emit('hai', data), 1000)
    setInterval(()=> {
        if(data.length > 5){
            data.reverse().pop()
            data.reverse()
        }
        console.log("length2", data.length)
    
        data.push({ name: data[data.length - 1].name + 1, x: Math.random() * 10, y: Math.random() * 10 })
        socket.emit('hai', data)
    }, 1000)

})
httpServer.listen(port)
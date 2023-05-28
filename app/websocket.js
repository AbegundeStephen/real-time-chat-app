// //run npm install websocket  and {websocket} from 'ws
// import  {WebSocket} from 'ws'
// // the init function creates a new websocket server which is bound to port 8181
// //it also causes an incomming connection to be distributed to all connection client 


// export default function initWebSocket(app) {
//    const wss = new WebSocket({port:8181})
//    const connections = [];
//    wss.on('connection', (ws) => {
//     connections.push(ws)
//     ws.on('message', (message) => {
//         const data = JSON.parse(message);
//         let msg;
//         switch (data.type) {
//             case 'join':
//             connections[data.name] = ws
//             msg = JSON.stringify({
//                 type:'join',
//                 names:Object.keys(connections)
//             });

//             break;
//             case 'msg':
//                 msg = JSON.stringify({
//                     type:'msg',
//                     name:data.name,
//                     msg:data.msg
//                 });

//                 break;
//         }
//        Object.values(connections).forEach((connection) => {
//         connection.send && connection.send(msg)
//        })
//         })
       
//     })

//     return function logout(user) {
//         connections[user].close();
//         delete connections[user];

//         const msg = JSON.stringify({
//             type:"join",
//             names: Object.keys(connections)
//         });
//       Object.values (connections).forEach((connection) => {
//         connection.send && connection.send(msg)
//       }) 
//     }
//    }
   


// //include the above code in roots index.js file

import { WebSocketServer } from 'ws';
 
export default function init(app) {
  const wss = new WebSocketServer({ port: 8181 });
 
  const connections = [];
  console.log(connections)
 
  wss.on('connection', (ws) => {
    connections.push(ws);
 
 connections.forEach((connection) => {
       connection.on("message", (message) => {
        connection.send && connection.send(message);
       })
      
      });

  });
}
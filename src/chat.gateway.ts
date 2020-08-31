import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class ChatGateway {

clients = [];

  @SubscribeMessage('Message')
  handleMessage(@MessageBody() payload: string,@ConnectedSocket() client:Socket) {
    console.log(payload);
    
    this.clients.forEach(socket=>{
      socket.emit("Message",payload);
    })
  }


  handleConnection(@ConnectedSocket() client:Socket)
  {
    console.log("Client Connected")
    this.clients.push(client);
    this.clients.forEach(socket =>{
      socket.emit("Connect","A client has connected")
    })
  }


  handleDisconnect(@ConnectedSocket()client:Socket)
  {
    console.log("Client Disconnected");
    this.clients.forEach(socket=>{
      socket.emit("Disconnect","A client has disconnected")
    })
    //this.clients.findIndex(client);

  }
}

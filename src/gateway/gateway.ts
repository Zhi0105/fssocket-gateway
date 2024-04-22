import { OnModuleInit } from "@nestjs/common";
import { 
  MessageBody, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer, 
  OnGatewayDisconnect 
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'

interface analyticsInterface {
  session: string,
  data: {}[]
}

let analytics: analyticsInterface = {
  session: "",
  data: []
}

// HANDLE SOCKET INITIAL CONNECTION
@WebSocketGateway()
export class GateWayConnection implements OnModuleInit{

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      analytics.session = socket.id
      console.log('Connected')
      console.log(socket.id)
    })
  }

  @SubscribeMessage('newLog')
  onNewMessage(@MessageBody() body: any) {
    analytics.data.push(body)
    console.log(body)
  }
}

//  HANDLE SOCKET DISCONNECT
@WebSocketGateway()
export class GateWayDisconnection implements OnGatewayDisconnect {  
  @WebSocketServer()
  server: Server

  handleDisconnect(client: Socket) {
    // this.server.emit('onLog', {
    //   msg: 'log test'
    //   content: body
    // })
    this.server.emit('onLog', analytics)
    analytics.session = ""
    analytics.data = []
    console.log('Disconnected:', client.id)
  }
}
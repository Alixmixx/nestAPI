import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server;

  userToSocketMap: Record<string, any> = {}; // Store user-to-socket mapping

  constructor() {
    console.log('WebSocketGateway init');
  }

  handleDisconnect(client: any): void {
    // Remove the user-to-socket mapping when a client disconnects
    const userId = Object.keys(this.userToSocketMap).find(
      (key) => this.userToSocketMap[key] === client,
    );
    if (userId) {
      delete this.userToSocketMap[userId];
    }
  }

  @SubscribeMessage('authenticate')
  handleAuthenticate(@MessageBody() userId: string): void {
    this.userToSocketMap[userId] = this.server;
    console.log(userId + " !");
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() { senderId, message } : { senderId: string; message: string}): void {
    // Broadcast the message to all connected clients
    console.log("handleMessage " + senderId + ": " + message)
    this.server.emit('message', { senderId, message });
  }
}

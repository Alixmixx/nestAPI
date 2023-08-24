import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor() {
    console.log('WebSocketGetaway init');
  }
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('handlemessage');
    this.server.emit('message', message);
  }
}

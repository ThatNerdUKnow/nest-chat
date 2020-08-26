import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('Message')
  handleMessage(client: any, payload: any): string {
    console.log(payload);
    return 'Hello world!';
  }
}

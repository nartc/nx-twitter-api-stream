import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  constructor(private readonly appService: AppService) {
    appService.tweets$.subscribe((data) => {
      this.server.emit('tweetData', data);
    });
  }

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log(client);
  }

  test() {
    console.log('test');
    this.server.emit('some', 'this is a test');
  }
}

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Subscription } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly subscriptionMap: Record<string, Subscription> = {};

  constructor(private readonly appService: AppService) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('subscribe')
  handleInitStream() {
    this.appService.getData();
    return 'Subscribed';
  }

  @SubscribeMessage('unsubscribe')
  handleStopStream(client: Socket) {
    this.unsubscribe(client);
    return 'Unsubscribed';
  }

  handleConnection(client: Socket): void {
    const exist = this.subscriptionMap[client.client.id];
    if (exist == null) {
      this.subscriptionMap[
        client.client.id
      ] = this.appService.tweets$.subscribe((data) =>
        client.emit('tweetData', data),
      );
    }
  }

  handleDisconnect(client: Socket): void {
    this.unsubscribe(client);
  }

  private unsubscribe(client: Socket) {
    this.subscriptionMap[client.client.id]?.unsubscribe();
    delete this.subscriptionMap[client.client.id];
  }
}

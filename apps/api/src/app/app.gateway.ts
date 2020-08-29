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
  private readonly subscriptionMap = new Map<string, Subscription>();

  constructor(private readonly appService: AppService) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('subscribe')
  handleInitStream(client: Socket) {
    this.appService.getData();
    this.initSubscription(client);
    return 'Subscribed';
  }

  @SubscribeMessage('unsubscribe')
  handleStopStream(client: Socket) {
    this.unsubscribe(client);
    return 'Unsubscribed';
  }

  handleConnection(client: Socket): void {
    this.initSubscription(client);
  }

  handleDisconnect(client: Socket): void {
    this.unsubscribe(client);
  }

  private initSubscription(client: Socket) {
    if (this.subscriptionMap.get(client.client.id) == null) {
      this.subscriptionMap.set(
        client.client.id,
        this.appService.tweets$.subscribe((data) => {
          console.log(client.client.id, 'streaming');
          client.emit('tweetData', data);
        }),
      );
    }
  }

  private unsubscribe(client: Socket) {
    this.subscriptionMap.get(client.client.id)?.unsubscribe();
    this.subscriptionMap.set(client.client.id, null);
    if ([...this.subscriptionMap.values()].every((sub) => sub == null)) {
      this.appService.stop();
    }
  }
}

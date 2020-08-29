import { Component, OnInit } from '@angular/core';
import { SocketService } from '@nartc/client/services';

@Component({
  selector: 'nartc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-webfw-twitter-stream';

  constructor(private readonly socketService: SocketService) {}

  ngOnInit() {
    this.socketService.on('tweetData').subscribe(console.log);
  }

  start() {
    this.socketService.emit('subscribe');
  }

  stop() {
    this.socketService.emit('unsubscribe');
  }
}

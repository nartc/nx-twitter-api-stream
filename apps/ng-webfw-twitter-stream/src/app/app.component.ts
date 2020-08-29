import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'nartc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-webfw-twitter-stream';

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    const socket = io('http://localhost:3333');
    socket.on('some', (data) => {
      console.log(data);
    });

    socket.on('tweetData', (data) => {
      console.log('tweet', data);
    });
    // this.http.get('http://localhost:3333/api/twitter').subscribe((data) => {
    //   console.log('data', data);
    // });
  }
}

import { Injectable } from '@angular/core';
import { applyTransaction } from '@datorama/akita';
import { SocketService } from '@nartc/client/services';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { WebFrameworksTweetsStore } from './state/web-frameworks-tweets/web-frameworks-tweets.store';
import { WebFrameworksStore } from './state/web-frameworks/web-frameworks.store';

@Injectable({ providedIn: 'root' })
export class WebFrameworksService {
  private readonly $unsubscribed = new Subject();

  constructor(
    private readonly socketService: SocketService,
    private readonly webFrameworksStore: WebFrameworksStore,
    private readonly webFrameworksTweetsStore: WebFrameworksTweetsStore,
  ) {}

  init() {
    this.socketService.emit('subscribe');
    this.webFrameworksStore.update({ subscribedAt: Date.now() });
    this.listenToTweetStream();
  }

  private listenToTweetStream() {
    this.socketService
      .on('tweetData')
      .pipe(
        tap((tweet) => {
          console.log(tweet);
          applyTransaction(() => {
            this.webFrameworksStore.updateFromTweet(tweet);
            this.webFrameworksTweetsStore.updateFromTweet(tweet);
          });
        }),
        takeUntil(this.$unsubscribed),
      )
      .subscribe();
  }

  unsubscribeStream() {
    this.socketService.emit('unsubscribe');
    this.$unsubscribed.next();
    this.webFrameworksStore.update({ subscribedAt: 0 });
  }
}

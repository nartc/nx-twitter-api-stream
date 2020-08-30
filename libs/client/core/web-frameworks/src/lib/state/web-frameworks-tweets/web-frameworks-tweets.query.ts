import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  WebFrameworksTweetsState,
  WebFrameworksTweetsStore,
} from './web-frameworks-tweets.store';

@Injectable({ providedIn: 'root' })
export class WebFrameworksTweetsQuery extends Query<WebFrameworksTweetsState> {
  tweetList$ = this.select('tweets');
  geoTweetList$ = this.select('geoTweets');

  constructor(protected store: WebFrameworksTweetsStore) {
    super(store);
  }
}

import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TweetFilteredStream } from '@nartc/client/models';

export interface WebFrameworksState {
  subscribedAt: number;
  angular: number;
  react: number;
  vue: number;

  [key: string]: number;
}

export function createInitialState(): WebFrameworksState {
  return {
    subscribedAt: 0,
    angular: 0,
    react: 0,
    vue: 0,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'web-frameworks', resettable: true })
export class WebFrameworksStore extends Store<WebFrameworksState> {
  constructor() {
    super(createInitialState());
  }

  updateFromTweet(tweet: TweetFilteredStream): void {
    const { matching_rules } = tweet;
    for (const rule of matching_rules) {
      this.update((state) => {
        return { ...state, [rule.tag]: state[rule.tag] + 1 };
      });
    }
  }
}

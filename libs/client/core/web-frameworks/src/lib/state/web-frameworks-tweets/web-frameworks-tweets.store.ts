import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { GeoTweet, Tweet, TweetFilteredStream } from '@nartc/client/models';

export interface WebFrameworksTweetsState {
  tweets: Tweet[];
  geoTweets: GeoTweet[];
}

export function createInitialState(): WebFrameworksTweetsState {
  return {
    tweets: [],
    geoTweets: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'web-frameworks-tweets', resettable: true })
export class WebFrameworksTweetsStore extends Store<WebFrameworksTweetsState> {
  constructor() {
    super(createInitialState());
  }

  updateFromTweet(tweet: TweetFilteredStream): void {
    const {
      data: { text, id, public_metrics },
      includes: {
        users: [author],
        places: [place] = [],
      },
      matching_rules,
    } = tweet;
    this.update((state) => {
      const newTweet = {
        text,
        author: {
          name: author.name,
          profileImage: author.profile_image_url,
          username: author.username,
        },
        url: `https://twitter.com/${author.username}/status/${id}`,
        metrics: public_metrics,
      };
      const updatedState = {
        ...state,
        tweets: [newTweet, ...state.tweets],
      };

      if (!!place) {
        updatedState.geoTweets = [
          {
            ...newTweet,
            tags: matching_rules.map((rule) => rule.tag) ?? [],
            lat: place.geo.bbox[1],
            lng: place.geo.bbox[0],
          },
          ...state.geoTweets,
        ];
      }

      return updatedState;
    });
  }
}

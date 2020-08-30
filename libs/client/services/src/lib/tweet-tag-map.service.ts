import { Injectable } from '@angular/core';
import { TweetTag } from '@nartc/client/models';

@Injectable({ providedIn: 'root' })
export class TweetTagMapService {
  private readonly _tags: Map<string, TweetTag> = new Map<string, TweetTag>([
    [
      'angular',
      {
        value: 'angular',
        label: 'Angular',
        color: '#c3042f',
        marker:
          'https://img.favpng.com/8/14/6/angularjs-logo-javascript-png-favpng-x5duQmnxfeA9TuRc3S19bzhjz.jpg',
      },
    ],
    [
      'react',
      {
        value: 'react',
        label: 'React',
        color: '#62dafb',
        marker:
          'https://i7.pngguru.com/preview/452/495/745/react-javascript-angularjs-ionic-github.jpg',
      },
    ],
    [
      'vue',
      {
        value: 'vue',
        label: 'Vue',
        color: '#3fb983',
        marker:
          'https://banner2.cleanpng.com/20180718/cbh/kisspng-vue-js-javascript-library-angularjs-react-vue-js-5b4ebe1bc45884.1915769815318871318042.jpg',
      },
    ],
  ]);

  get tags(): TweetTag[] {
    return [...this._tags.values()];
  }

  getTag(key: string): TweetTag {
    return this._tags.get(key);
  }
}

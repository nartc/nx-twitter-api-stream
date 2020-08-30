import { Injectable } from '@angular/core';
import { TweetTag } from '@nartc/client/models';

@Injectable({ providedIn: 'root' })
export class TweetTagMapService {
  private readonly _tags: Map<string, TweetTag> = new Map<string, TweetTag>([
    [
      'angular',
      { value: 'angular', label: 'Angular', color: '#c3042f', marker: '' },
    ],
    ['react', { value: 'react', label: 'React', color: '#62dafb', marker: '' }],
    ['vue', { value: 'vue', label: 'Vue', color: '#3fb983', marker: '' }],
  ]);

  get tags(): TweetTag[] {
    return [...this._tags.values()];
  }

  getTag(key: string): TweetTag {
    return this._tags.get(key);
  }
}

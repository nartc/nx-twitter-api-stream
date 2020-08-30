import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TweetRule, TweetTag } from '@nartc/client/models';

export interface WebFrameworksRulesState {
  defaultRules: (TweetRule & TweetTag)[];
  rules: (TweetRule & TweetTag)[];
}

export function createInitialState(): WebFrameworksRulesState {
  return {
    defaultRules: [],
    rules: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'web-frameworks-rules', resettable: true })
export class WebFrameworksRulesStore extends Store<WebFrameworksRulesState> {
  constructor() {
    super(createInitialState());
  }
}

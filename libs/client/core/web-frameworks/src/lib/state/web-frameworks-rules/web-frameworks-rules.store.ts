import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TweetRule } from '@nartc/client/models';

export interface WebFrameworksRulesState {
  rules: TweetRule[];
}

export function createInitialState(): WebFrameworksRulesState {
  return {
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

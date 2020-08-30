import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  WebFrameworksRulesState,
  WebFrameworksRulesStore,
} from './web-frameworks-rules.store';

@Injectable({ providedIn: 'root' })
export class WebFrameworksRulesQuery extends Query<WebFrameworksRulesState> {
  rules$ = this.select('rules');

  constructor(protected store: WebFrameworksRulesStore) {
    super(store);
  }
}

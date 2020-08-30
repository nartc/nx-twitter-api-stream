import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { WebFrameworksState, WebFrameworksStore } from './web-frameworks.store';

@Injectable({ providedIn: 'root' })
export class WebFrameworksQuery extends Query<WebFrameworksState> {
  subscribedAt$ = this.select('subscribedAt');
  isSubscribed$ = this.subscribedAt$.pipe(map((subscribed) => !!subscribed));

  constructor(protected store: WebFrameworksStore) {
    super(store);
  }
}

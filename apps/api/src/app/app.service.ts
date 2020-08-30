import { HttpService, Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';
import {
  fromEventPattern,
  ReplaySubject,
  Subscription,
  throwError,
} from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AppService {
  private subscription: Subscription;
  private readonly $tweets = new ReplaySubject(1);
  tweets$ = this.$tweets.asObservable();

  constructor(private readonly http: HttpService) {}

  getData() {
    if (this.subscription == null) {
      this.subscription = this.http
        .get(
          'https://api.twitter.com/2/tweets/search/stream?tweet.fields=created_at,geo,author_id,public_metrics&expansions=author_id,geo.place_id&user.fields=profile_image_url,url&place.fields=geo',
          {
            headers: {
              Connection: 'keep-alive',
              Authorization:
                'Bearer AAAAAAAAAAAAAAAAAAAAAIWeHAEAAAAAlRRsJrB9%2BIEMUsnz9Q1beIF6uqI%3Dm1cOuYOIyAhgkhzvZ5PmvsBLpwB9YYnIEQRc2nmWYaB7KjeKFu',
            },
            responseType: 'stream',
          },
        )
        .pipe(
          catchError((err) => throwError(err)),
          tap(() => {
            console.log('streamed');
          }),
          map((res) => res.data),
          switchMap((incomingMessage: IncomingMessage) => {
            return fromEventPattern(
              (handler) => {
                incomingMessage.on('data', handler);
              },
              (handler) => {
                incomingMessage.off('data', handler);
                incomingMessage.destroy();
              },
            );
          }),
          finalize(() => {
            console.log('stopped stream');
          }),
        )
        .subscribe((data: unknown) => {
          try {
            this.$tweets.next(JSON.parse(data as string));
          } catch (e) {
            console.error('error parsing tweet');
          }
        });
    }
  }

  stop() {
    console.log('stopping');
    this.subscription?.unsubscribe();
    this.subscription = null;
  }
}

import { HttpService, Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { ReplaySubject, Subject, Subscription, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Injectable()
export class AppService {
  private subscription: Subscription;
  private readonly $stop = new Subject();
  private readonly $tweets = new ReplaySubject(1);
  tweets$ = this.$tweets.asObservable();

  constructor(private readonly http: HttpService) {}

  getData() {
    if (this.subscription == null) {
      this.subscription = this.http
        .get(
          'https://api.twitter.com/2/tweets/search/stream?tweet.fields=created_at&expansions=author_id&user.fields=created_at',
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
          takeUntil(this.$stop),
        )
        .subscribe((data) => {
          (data.data as IncomingMessage).on('data', (d) => {
            this.$tweets.next(JSON.parse(d));
          });
        });
    }
  }

  stop() {
    this.$stop.next();
    this.$stop.complete();
  }
}

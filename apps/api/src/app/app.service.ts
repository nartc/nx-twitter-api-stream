import { HttpService, Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';
import * as randomLocation from 'random-location';
import {
  fromEventPattern,
  ReplaySubject,
  Subscription,
  throwError,
} from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AppService {
  private readonly baseUrl = process.env.TWITTER_STREAM_URL || '';
  private readonly bearerToken = 'Bearer ' + process.env.TWITTER_BEARER_TOKEN;
  private readonly usCenter = { latitude: 39.8283459, longitude: -98.5794797 };
  private subscription: Subscription;
  private readonly $tweets = new ReplaySubject(1);
  tweets$ = this.$tweets.asObservable();

  constructor(private readonly http: HttpService) {}

  getRules() {
    return this.http
      .get(`${this.baseUrl}/rules`, {
        headers: { Authorization: this.bearerToken },
      })
      .pipe(map((res) => res.data.data));
  }

  addRules(rules: { value: string; tag: string }[]) {
    return this.http
      .post(
        `${this.baseUrl}/rules`,
        {
          add: rules,
        },
        {
          headers: { Authorization: this.bearerToken },
        },
      )
      .pipe(map((res) => res.data.data));
  }

  deleteRules(rules: string[]) {
    return this.http
      .post(
        `${this.baseUrl}/rules`,
        {
          delete: { ids: rules },
        },
        {
          headers: { Authorization: this.bearerToken },
        },
      )
      .pipe(map((res) => res.data.data));
  }

  getData() {
    if (this.subscription == null) {
      this.subscription = this.http
        .get(
          `${this.baseUrl}?tweet.fields=created_at,geo,author_id,public_metrics&expansions=author_id,geo.place_id&user.fields=profile_image_url,url&place.fields=geo`,
          {
            headers: {
              Connection: 'keep-alive',
              Authorization: this.bearerToken,
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
            const parsed = JSON.parse(data as string);
            if (!parsed.geo && !parsed.includes.places) {
              const random = randomLocation.randomCirclePoint(
                this.usCenter,
                2000000,
              );
              parsed.includes.places = [
                {
                  geo: {
                    bbox: [random.longitude, random.latitude],
                  },
                },
              ];
            }
            this.$tweets.next(parsed);
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

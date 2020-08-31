import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  DynamicDialogConfig,
  DynamicDialogService,
} from '@nartc/client/core/dynamic-dialog';
import { WebFrameworksChartData, WebFrameworksVm } from '@nartc/client/models';
import { TweetTagMapService } from '@nartc/client/services';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { SettingsComponent } from '../dialogs/settings/settings.component';
import { WebFrameworksRulesQuery } from '../state/web-frameworks-rules/web-frameworks-rules.query';
import { WebFrameworksTweetsQuery } from '../state/web-frameworks-tweets/web-frameworks-tweets.query';
import { WebFrameworksQuery } from '../state/web-frameworks/web-frameworks.query';
import { WebFrameworksService } from '../web-frameworks.service';

@Component({
  selector: 'nartc-web-frameworks',
  templateUrl: './web-frameworks.component.html',
  styleUrls: ['./web-frameworks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebFrameworksComponent implements OnInit, OnDestroy {
  subscribedAt$ = this.webFrameworksQuery.subscribedAt$;
  isSubscribed$ = this.webFrameworksQuery.isSubscribed$;
  chartData$ = this.webFrameworksQuery
    .select((state) => {
      const { subscribedAt, ...frameworks } = state;
      return frameworks;
    })
    .pipe(
      map((state) =>
        Object.entries(state).reduce(
          (acc: WebFrameworksChartData, [key, count]) => {
            const tag = this.tweetTagMapService.getTag(key);
            acc.results.push({ name: tag.label, value: count });
            if (tag.color) {
              acc.customColors.push({ name: tag.label, value: tag.color });
            }
            return acc;
          },
          { results: [], customColors: [] },
        ),
      ),
      tap((chartData) => {
        chartData.results.sort((a, b) => b.value - a.value);
      }),
    );

  vm$: Observable<WebFrameworksVm>;

  constructor(
    private readonly webFrameworksService: WebFrameworksService,
    private readonly tweetTagMapService: TweetTagMapService,
    private readonly dynamicDialogService: DynamicDialogService,
    private readonly webFrameworksQuery: WebFrameworksQuery,
    private readonly webFrameworksTweetsQuery: WebFrameworksTweetsQuery,
    private readonly webFrameworksRulesQuery: WebFrameworksRulesQuery,
  ) {}

  ngOnInit(): void {
    this.webFrameworksService.init();

    this.vm$ = combineLatest([
      this.chartData$,
      this.webFrameworksTweetsQuery.tweetList$,
      this.webFrameworksTweetsQuery.geoTweetList$,
    ]).pipe(
      map(([chartData, tweets, geoTweets]) => ({
        chartData,
        tweets,
        geoTweets,
      })),
    );
  }

  toggleStream(isSubscribed: boolean) {
    if (isSubscribed) {
      this.webFrameworksService.unsubscribeStream();
    } else {
      this.webFrameworksService.init();
    }
  }

  onSettingsClicked() {
    this.webFrameworksRulesQuery.rules$
      .pipe(
        take(1),
        switchMap((rules) => {
          const config = new DynamicDialogConfig<typeof rules>();
          config.data = rules;
          config.header = 'Adjust Twitter Queries';
          config.closable = true;
          const ref = this.dynamicDialogService.open<
            { value: string; tag: string }[]
          >(SettingsComponent, config);
          return ref.afterClosed;
        }),
      )
      .subscribe((rulesToAdd) => {
        if (rulesToAdd) {
          this.webFrameworksService.addRules(rulesToAdd);
        }
      });
  }

  ngOnDestroy() {
    this.webFrameworksService.unsubscribeStream();
  }
}

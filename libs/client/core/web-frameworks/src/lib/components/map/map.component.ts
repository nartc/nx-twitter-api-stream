import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { GeoTweet } from '@nartc/client/models';
import { TweetTagMapService } from '@nartc/client/services';

interface Marker {
  id: string;
  options: google.maps.MarkerOptions;
  position: google.maps.LatLng;
}

@Component({
  selector: 'nartc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  center = new google.maps.LatLng(39.8283459, -98.5794797);
  markers: Marker[] = [];

  @Input() set geoTweets(geoTweets: GeoTweet[]) {
    this.convertToMarkers(geoTweets);
  }

  private convertToMarkers(geoTweets: GeoTweet[]) {
    if (!this.markers.length) {
      this.markers = geoTweets.reduce((markers, tweet) => {
        this.resolveTag(tweet, markers);
        return markers;
      }, [] as Marker[]);
    } else {
      for (const geoTweet of geoTweets) {
        if (this.markers.some((marker) => marker.id === geoTweet.url)) {
          continue;
        }
        this.resolveTag(geoTweet, this.markers);
      }
    }
    this.cdr.markForCheck();
  }

  private resolveTag(tweet: GeoTweet, markers: Marker[]) {
    const tags = tweet.tags.map((tag) => this.tweetTagMapService.getTag(tag));

    for (const tag of tags) {
      markers.push({
        id: tweet.url,
        options: {
          draggable: false,
          animation: google.maps.Animation.DROP,
          icon: tag.marker
            ? {
                url: tag.marker,
                size: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0, 0),
                scaledSize: new google.maps.Size(32, 32),
              }
            : undefined,
        },
        position: new google.maps.LatLng(tweet.lat, tweet.lng),
      });
    }
  }

  constructor(
    private readonly tweetTagMapService: TweetTagMapService,
    private readonly cdr: ChangeDetectorRef,
  ) {}
}

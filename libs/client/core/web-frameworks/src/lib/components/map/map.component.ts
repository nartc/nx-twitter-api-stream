import { Component, Input, OnInit } from '@angular/core';
import { GeoTweet } from '@nartc/client/models';

@Component({
  selector: 'nartc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() geoTweets: GeoTweet[];

  constructor() {}

  ngOnInit(): void {}
}

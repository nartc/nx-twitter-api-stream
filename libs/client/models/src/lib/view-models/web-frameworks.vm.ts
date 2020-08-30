import { TweetPublicMetrics } from '../tweet-filtered-stream';

export interface Author {
  name: string;
  profileImage: string;
  username: string;
}

export interface Tweet {
  author: Author;
  text: string;
  url: string;
  metrics: TweetPublicMetrics;
}

export interface GeoTweet extends Tweet {
  tags: string[];
  lat: number;
  lng: number;
}

export interface ChartResult {
  name: string;
  value: number;
}

export interface ChartCustomColor {
  name: string;
  value: string;
}

export interface WebFrameworksChartData {
  results: ChartResult[];
  customColors: ChartCustomColor[];
}

export interface WebFrameworksVm {
  chartData: WebFrameworksChartData;
  tweets: Tweet[];
  geoTweets: GeoTweet[];
}

export interface TweetPublicMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
}

export interface TweetData {
  author_id: string;
  created_at: string;
  id: string;
  text: string;
  public_metrics: TweetPublicMetrics;
}

export interface TweetUser {
  id: string;
  name: string;
  profile_image_url: string;
  url: string;
  username: string;
}

export interface TweetPlaceGeo {
  bbox: number[];
  type: string;
  properties: Record<string, unknown>;
}

export interface TweetPlace {
  id: string;
  full_name: string;
  geo: TweetPlaceGeo;
}

export interface TweetExpansion {
  users: TweetUser[];
  places: TweetPlace[];
}

export interface TweetMatchingRule {
  id: number;
  tag: string;
}

export interface TweetFilteredStream {
  data: TweetData;
  includes: TweetExpansion;
  matching_rules: TweetMatchingRule[];
}

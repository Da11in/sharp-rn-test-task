import { TweetTypes } from "../enums/TweetTypes";

export type Tweet = {
  Id: string;
  Created: string;
  Type: TweetTypes;
  VideoUrl: string | null;
  VideoThumbnail: string | null;
  Comment: string | null;
};

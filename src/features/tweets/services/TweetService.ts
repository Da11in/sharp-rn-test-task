import { ApiService } from "@services";
import type { Tweet, Photo, TimeLog } from "@tweets/types";

export const TweetService = {
  getAllTweets: (page: number = 1) => ApiService.get<Tweet[]>("/tweets", { params: { page } }),
  getTweetPhotos: (id: string) => ApiService.get<Photo[]>(`/tweets/${id}/photos`),
  getTweetTimeLogs: (id: string) => ApiService.get<TimeLog[]>(`/tweets/${id}/time`),
};

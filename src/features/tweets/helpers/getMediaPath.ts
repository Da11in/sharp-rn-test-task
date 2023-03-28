import Constants from "expo-constants";

export const getMediaPath = (path: string) =>
  `${Constants.expoConfig.extra.baseURL}/${path}`.replace(/\\/g, "/");

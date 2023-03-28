import { FlatList, StyleSheet, Image, View } from "react-native";
import React, { useCallback } from "react";

import { colors } from "@styles/colors";
import { useData } from "@hooks";

import { TweetService } from "../../services/TweetService";
import { getMediaPath } from "../../helpers";

import type { Photo } from "../../types";

type Props = {
  id: string;
};

const TweetPhotos: React.FC<Props> = ({ id }): React.ReactElement => {
  const { data, loading } = useData({
    fetchFn: () => TweetService.getTweetPhotos(id),
  });

  const _renderItem = useCallback(
    ({ item }: { item: Photo }) => (
      <Image
        style={styles.photo}
        source={{
          uri: getMediaPath(item.UrlOriginal),
        }}
      />
    ),
    [data]
  );

  const _keyExtractor = useCallback((photo: Photo) => photo.Id, [data]);

  const _itemLayout = useCallback(
    (item, index) => ({ length: 130, offset: 130 * index, index }),
    [data]
  );

  return loading ? (
    <View style={[styles.photo, styles.skeleton]} />
  ) : (
    <FlatList
      horizontal
      data={data}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      getItemLayout={_itemLayout}
    />
  );
};

export default React.memo(TweetPhotos);

const styles = StyleSheet.create({
  photo: { width: 120, height: 120, marginRight: 10 },
  skeleton: { backgroundColor: colors.gray },
});

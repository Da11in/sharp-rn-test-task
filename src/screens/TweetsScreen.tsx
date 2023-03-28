import { ActivityIndicator, StyleSheet, FlatList, View } from "react-native";
import { useCallback, useEffect } from "react";
import Toast from "react-native-root-toast";

import { TweetListItem } from "@tweets/components/TweetListItem";
import { TweetService } from "@tweets/services/TweetService";
import type { Tweet } from "@features/tweets/types";
import { usePaginatedData } from "@hooks";
import { colors } from "@styles/colors";

const TweetsScreens = () => {
  const { data, error, loading, initialLoading, loadNextPage } = usePaginatedData({
    fetchFn: TweetService.getAllTweets,
    paginationType: "add",
  });

  useEffect(() => {
    if (error) {
      Toast.show(error, { position: Toast.positions.BOTTOM, backgroundColor: colors.red });
    }
  }, [error]);

  const _renderItem = useCallback(
    ({ item }: { item: Tweet }) => <TweetListItem tweet={item} />,
    []
  );

  const _keyExtractor = useCallback((item: Tweet) => item.Id, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        style={styles.list}
        onEndReached={loadNextPage}
        ListFooterComponent={
          !initialLoading && loading ? <ActivityIndicator style={styles.listLoading} /> : null
        }
      />

      {initialLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.purple} />
        </View>
      )}
    </View>
  );
};

export default TweetsScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  list: {
    paddingHorizontal: 20,
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000002",
  },
  listLoading: {
    marginVertical: 20,
  },
});

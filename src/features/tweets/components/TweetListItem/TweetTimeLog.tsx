import { FlatList, StyleSheet, View, Text } from "react-native";
import React, { useCallback } from "react";
import moment from "moment";

import { colors } from "@styles/colors";
import { useData } from "@hooks";

import { TweetService } from "../../services/TweetService";

import type { TimeLog } from "../../types";

type Props = {
  id: string;
};

const dateFormat = "DD.MM.YYYY hh:mm";

const TweetTimeLog: React.FC<Props> = ({ id }): React.ReactElement => {
  const { data, loading } = useData({
    fetchFn: () => TweetService.getTweetTimeLogs(id),
  });

  const _renderItem = useCallback(
    ({ item }: { item: TimeLog }) => (
      <View style={styles.timelog} key={item.Id}>
        <View style={styles.timelogLine}>
          <Text style={styles.timelogLabel}>Start: </Text>
          <Text>{moment(item.Start).format(dateFormat)}</Text>
        </View>
        <View style={styles.timelogLine}>
          <Text style={styles.timelogLabel}>End: </Text>
          <Text>{moment(item.Finish).format(dateFormat)}</Text>
        </View>
      </View>
    ),
    [data]
  );

  const _keyExtractor = useCallback((timelog: TimeLog) => timelog.Id, [data]);

  return loading ? (
    <View>
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonLine} />
    </View>
  ) : (
    <FlatList data={data} renderItem={_renderItem} keyExtractor={_keyExtractor} />
  );
};

export default React.memo(TweetTimeLog);

const styles = StyleSheet.create({
  timelog: {
    marginBottom: 15,
  },
  timelogLine: {
    flexDirection: "row",
  },
  timelogLabel: {
    fontWeight: "600",
    color: colors.purple,
    width: 60,
  },
  skeletonLine: {
    width: "50%",
    height: 10,
    backgroundColor: colors.gray,
    marginVertical: 5,
  },
});

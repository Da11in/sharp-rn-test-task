import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from "react-native";
import { useRef, memo } from "react";
import moment from "moment";
import RenderHtml from "react-native-render-html";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

import type { Tweet } from "@tweets/types";
import type { UseNavigationProps } from "@app/routing";

import { Button, Card } from "@components";
import { colors } from "@styles/colors";

import { getMediaPath } from "../../helpers";
import { TweetTypes } from "../../enums";
import TweetPhotos from "./TweetPhotos";
import TweetTimeLog from "./TweetTimeLog";

type Props = {
  tweet: Tweet;
};

const TweetListItem: React.FC<Props> = ({ tweet }): React.ReactElement => {
  const { navigate } = useNavigation<UseNavigationProps>();

  const video = useRef(null);

  const { width } = useWindowDimensions();

  const tweetContent = () => {
    switch (tweet.Type) {
      case TweetTypes.Text: {
        return <RenderHtml contentWidth={width} source={{ html: tweet.Comment }} />;
      }

      case TweetTypes.Photo: {
        return <TweetPhotos id={tweet.Id} />;
      }

      case TweetTypes.Video: {
        return (
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: getMediaPath(tweet.VideoUrl),
            }}
            useNativeControls
          />
        );
      }

      case TweetTypes.Timelog: {
        return <TweetTimeLog id={tweet.Id} />;
      }

      default:
        break;
    }
  };

  const onPress = () => {
    navigate("TweetDetails", { id: tweet.Id });
  };

  return (
    <View style={styles.listItem}>
      <Card>
        <ScrollView style={styles.content}>{tweetContent()}</ScrollView>
        <Text style={styles.created}>{moment(tweet.Created).format("DD.MM.YYYY hh:mm")}</Text>
        <Button text="View" onPress={onPress} />
      </Card>
    </View>
  );
};

export default memo(TweetListItem);

const styles = StyleSheet.create({
  listItem: {
    marginTop: 20,
  },
  content: {
    maxHeight: 120,
    overflow: "hidden",
  },
  video: {
    height: 120,
  },
  created: {
    color: colors.light_blue,
    marginTop: 10,
    alignSelf: "flex-end",
  },
});

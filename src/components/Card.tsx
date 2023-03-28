import { StyleSheet, View } from "react-native";
import { colors } from "@styles/colors";

type Props = {
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({ children }): React.ReactElement => (
  <View style={styles.card}>{children}</View>
);

export default Card;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderColor: colors.purple,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    shadowColor: colors.light_blue,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    backgroundColor: colors.white,
  },
});

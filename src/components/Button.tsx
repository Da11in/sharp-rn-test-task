import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@styles/colors";

type Props = {
  text: string;
  onPress: () => void;
};

const Button: React.FC<Props> = ({ text, onPress }): React.ReactElement => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.purple,
    padding: 20,
    marginTop: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});

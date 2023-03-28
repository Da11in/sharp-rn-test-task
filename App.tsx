import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/app/routing";
import "./src/app/network";
import { StatusBar } from "expo-status-bar";
import { colors } from "@styles/colors";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={colors.dark_purple} />
      <AppNavigation />
    </NavigationContainer>
  );
}

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { TweetsScreen, TweetDetailsScreen } from "@screens";
import { colors } from "@styles/colors";

export type AppRoutes = {
  Tweets: undefined;
  TweetDetails: { id: string };
};

export type UseNavigationProps = NativeStackNavigationProp<AppRoutes>;

const Stack = createNativeStackNavigator<AppRoutes>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tweets"
      screenOptions={{
        headerStyle: { backgroundColor: colors.dark_purple },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen name="Tweets" component={TweetsScreen} />
      <Stack.Screen name="TweetDetails" component={TweetDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

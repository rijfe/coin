import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import SignInScreen, { screenOptions as SingInScreenOptins } from "../screens/SignInScreen";
import SignUpScreen, { screenOptions as SignUpScreenOptions } from "../screens/SignUpScreen";
import { screenOptions as UserMainScreenOptions, headerOptions } from "../screens/UserMainScree";
import LoadingScreen from "../screens/LoadingScreen";
import { screenOptions as UserInfoScreenOptins } from "../screens/UserInfoScreen";
import LoadingUserInfoScreen from "../screens/LoadingUserInfoScreen";
import StartScreen, { screenOptions as StartScreenOptions } from "../screens/StartScreen";
import UserTradeListScreen, { screenOptions as UserTradeListScreenOptions } from "../screens/UserTradeListScreen";

const Tab = createBottomTabNavigator();

const UserNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "UserMain") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "UserTrade") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else {
            iconName = focused ? "ios-person-circle" : "ios-person-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "#FFD700",
      })}
    >
      <Tab.Screen name="UserMain" component={LoadingScreen} options={UserMainScreenOptions} />
      <Tab.Screen name="UserTrade" component={UserTradeListScreen} options={UserTradeListScreenOptions} />
      <Tab.Screen name="UserInfo" component={LoadingUserInfoScreen} options={UserInfoScreenOptins} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} options={StartScreenOptions} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={SingInScreenOptins} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={SignUpScreenOptions} />
        <Stack.Screen name="User" component={UserNavigator} options={headerOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

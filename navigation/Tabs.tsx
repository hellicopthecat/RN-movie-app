import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import {useColorScheme} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {
  ACCCENT_COLOR,
  DARK_COLOR,
  LIGHT_COLOR,
  NONSELECT_COLOR,
} from "../color";

const Tab = createBottomTabNavigator();
const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: isDark ? DARK_COLOR : LIGHT_COLOR}}
      initialRouteName="Movies"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: isDark ? DARK_COLOR : LIGHT_COLOR,
        },
        headerTitleStyle: {color: isDark ? ACCCENT_COLOR : NONSELECT_COLOR},
        tabBarStyle: {backgroundColor: isDark ? DARK_COLOR : LIGHT_COLOR},
        tabBarActiveTintColor: isDark ? ACCCENT_COLOR : DARK_COLOR,
        tabBarInactiveTintColor: isDark ? NONSELECT_COLOR : DARK_COLOR,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
          marginTop: -10,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movie}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Ionicons
                name={focused ? "film" : "film-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Ionicons
                name={focused ? "tv" : "tv-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
export default Tabs;

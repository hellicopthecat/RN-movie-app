import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useColorScheme} from "react-native";
import Detail from "../screens/Detail";

import {
  ACCCENT_COLOR,
  DARK_COLOR,
  LIGHT_COLOR,
  NONSELECT_COLOR,
} from "../color";
const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? DARK_COLOR : LIGHT_COLOR,
        },
        headerTitleStyle: {
          color: isDark ? ACCCENT_COLOR : NONSELECT_COLOR,
        },
        headerTintColor: isDark ? ACCCENT_COLOR : NONSELECT_COLOR,
        presentation: "formSheet",
        animation: "fade",
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};
export default Stack;

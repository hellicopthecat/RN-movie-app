import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const Navigate = createNativeStackNavigator();

const RootNav = () => {
  return (
    <Navigate.Navigator
      screenOptions={{presentation: "modal", headerShown: false}}
    >
      <Navigate.Screen name="Tabs" component={Tabs} />
      <Navigate.Screen name="Stack" component={Stack} />
    </Navigate.Navigator>
  );
};
export default RootNav;

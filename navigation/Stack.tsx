import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Text, TouchableOpacity, View} from "react-native";

const ScreenOne = ({navigation: {navigate}}) => (
  <View>
    <TouchableOpacity onPress={() => navigate("two")}>
      <Text>screen one</Text>
    </TouchableOpacity>
  </View>
);
const ScreenTwo = ({navigation: {navigate}}) => (
  <View>
    <TouchableOpacity onPress={() => navigate("three")}>
      <Text>screen two</Text>
    </TouchableOpacity>
  </View>
);
const ScreenThree = ({navigation: {goBack, setOptions, navigate}}) => (
  <View>
    <TouchableOpacity onPress={() => setOptions({title: "hihi"})}>
      <Text>Touch me</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigate("one")}>
      <Text>Go NO.1</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => goBack()}>
      <Text>go Back</Text>
    </TouchableOpacity>
  </View>
);
const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "pink",
        presentation: "formSheet",
        animation: "fade",
      }}
    >
      <NativeStack.Screen
        name="one"
        component={ScreenOne}
        options={{title: "1"}}
      ></NativeStack.Screen>
      <NativeStack.Screen
        name="two"
        component={ScreenTwo}
        options={{title: "2"}}
      ></NativeStack.Screen>
      <NativeStack.Screen
        name="three"
        component={ScreenThree}
        options={{presentation: "modal"}}
      ></NativeStack.Screen>
    </NativeStack.Navigator>
  );
};
export default Stack;

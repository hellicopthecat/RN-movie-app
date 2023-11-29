import {Dimensions} from "react-native";
import {DefaultTheme} from "styled-components/native";

export const lightTheme: DefaultTheme = {
  mainBgColor: "white",
  txtColor: "#1e272e",
  accentColor: "#FFC436",
};
export const darkTheme: DefaultTheme = {
  mainBgColor: "#1e272e",
  txtColor: "#d2dae2",
  accentColor: "#FFC436",
};
export const {height: SCREEN_HEIGHT} = Dimensions.get("window");

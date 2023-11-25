import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    mainBgColor: string;
    txtColor: string;
    accentColor: string;
  }
}

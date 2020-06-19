import * as React from 'react';
import Main from './src/Main';
import { Platform } from "react-native";
import { enableFontPatch } from "./src/utils/fontPatch";

if (Platform.OS === "android") {
  enableFontPatch();  
}

export default class App extends React.PureComponent {
  render() {
    return <Main />;
  }
}

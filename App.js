import * as React from 'react';
import { Platform } from 'react-native';
import Main from './src/Main';
import enableFontPatch from './src/utils/fontPatch';

if (Platform.OS === 'android') {
  enableFontPatch();
}

export default class App extends React.PureComponent {
  render() {
    return <Main />;
  }
}

import * as React from 'react';
import * as Font from 'expo-font';
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
// import { Image, View } from 'react-native';
// import { ProgressBar } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import Router from './routes';
// import { colors } from './utils/styles';
import AppSplashScreen from './components/AppSplashScreen';

const cacheFonts = (fonts = []) => fonts.map(font => Font.loadAsync(font));

// const progressPromise = (promises, callback) => {
//   const len = promises.length;
//   let progress = 0;

//   const tick = (promise) => {
//     promise.then(() => {
//       progress += 1;
//       callback(progress, len);
//     });

//     return promise;
//   };

//   return Promise.all(promises.map(tick));
// };

class Main extends React.Component {
  state = {
    isReady: false,
  }

  componentDidMount() {
    SplashScreen.preventAutoHideAsync();
  }

  // _loadAssetsAsync = async () => {
  //   SplashScreen.hideAsync();
  //   const fontAssets = cacheFonts([
  //     FontAwesome.font,
  //     MaterialCommunityIcons.font,
  //     MaterialIcons.font, Ionicons.font,
  //   ]);

  //   await progressPromise([...fontAssets], (completed, total) => {
  //     this.setState({ progress: (completed / total) * 100 });
  //   });

  //   this.setState({ isReady: true });
  // }

  render() {
    const { isReady } = this.state;
    if (!isReady) {
      return (
        <AppSplashScreen
          promises={cacheFonts([
            FontAwesome.font,
            MaterialCommunityIcons.font,
            MaterialIcons.font,
            Ionicons.font,
          ])}
          onComplete={() => this.setState({ isReady: true })}
        />
      );
    }

    return (
      <Router />
    );
  }
}

export default Main;

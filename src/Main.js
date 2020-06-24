import * as React from 'react';
import * as Font from 'expo-font';
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import Router from './routes';
import AppSplashScreen from './components/AppSplashScreen';

const cacheFonts = (fonts = []) => fonts.map(font => Font.loadAsync(font));

class Main extends React.Component {
  state = {
    isReady: false,
  }

  componentDidMount() {
    SplashScreen.preventAutoHideAsync();
  }

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

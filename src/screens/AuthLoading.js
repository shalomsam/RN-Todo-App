import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  AsyncStorage,
  YellowBox,
} from 'react-native';
import PropTypes from 'prop-types';
import user from '../database/User';
import AppSplashScreen from '../components/AppSplashScreen';


export default class AuthLoading extends React.Component {
  componentDidMount() {
    YellowBox.ignoreWarnings(['Setting a timer']);

    const { navigation } = this.props;

    user.app.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        navigation.navigate('App');
        AsyncStorage
          .setItem('currentUser', JSON.stringify(currentUser))
          .catch(e => console.log('AuthLoading:AsyncStorage error >>', e));
      } else {
        navigation.navigate('Login');
      }
    }, (error) => {
      navigation.navigate('Login', { error });
    });
  }

  render() {
    return (
      <AppSplashScreen
        autoProgress
      />
    );
  }
}

AuthLoading.propTypes = {
  navigation: PropTypes.object,
};

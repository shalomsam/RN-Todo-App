import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import user from '../database/User';

export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
    const { navigation } = this.props;

    user.app.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        navigation.navigate('App');
        AsyncStorage
          .setItem('currentUser', JSON.stringify(currentUser))
          .catch(e => console.log('AuthLoading:AsyncStorage error >>', e));
      } else {
        navigation.navigate('Signup');
      }
    }, (error) => {
      navigation.navigate('Login', { error });
    });
  };

  render() {
    return (
      <View>
        <StatusBar barStyle="default" />
        <ActivityIndicator />
      </View>
    );
  }
}

AuthLoading.propTypes = {
  navigation: PropTypes.object,
};

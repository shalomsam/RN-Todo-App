import React from 'react';
import {
    AsyncStorage,
    YellowBox,
} from 'react-native';
import PropTypes from 'prop-types';
import user from '../database/User';
import AppSplashScreen from '../components/AppSplashScreen';
import { logger } from '../utils/LogManager';

export default class AuthLoading extends React.Component {
    componentDidMount() {
        YellowBox.ignoreWarnings(['Setting a timer']);

        const { navigation } = this.props;

        const unsubscirbe = user.app.auth().onAuthStateChanged((currentUser) => {
            if (currentUser) {
                navigation.navigate('App', { screen: 'TaskLists', params: { currentUser } });
                AsyncStorage
                    .setItem('currentUser', JSON.stringify(currentUser))
                    .catch((e) => logger.error('AuthLoading:AsyncStorage error >>', e));
            } else {
                navigation.navigate('Login');
            }
            if (unsubscirbe) {
                unsubscirbe();
            }
        }, (error) => {
            logger.error('AuthLoading:onAuthStateChanged >> ', error);
            navigation.navigate('Login', { error });
            if (unsubscirbe) {
                unsubscirbe();
            }
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

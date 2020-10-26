import React from 'react';
import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as GoogleSignIn from 'expo-google-sign-in';
import { colors } from '../../utils/styles';
import userDb from '../../database/User';
// import appConfig from '../../../app.json';
import { logger } from '../../utils/LogManager';

WebBrowser.maybeCompleteAuthSession();

const transparentStyle = { opacity: 0.9 };
const iconSize = 40;

const GoogleButton = ({ callback }) => {
    React.useEffect(async () => {
        await GoogleSignIn.initAsync();
    });

    const promptAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const siginAsyncResult = await GoogleSignIn.signInAsync();
            logger.info('GoogleButton:signInAsync:result >> ', siginAsyncResult);
            const { type, user } = siginAsyncResult;
            if (type === 'success') {
                const res = await userDb.socialSignIn('google', user.auth.idToken);
                callback(res);
            }
        } catch (e) {
            logger.error('GoogleButton:promptAsync:error >>', e);
        }
    };

    return (
        <View>
            <FontAwesome
                style={transparentStyle}
                name="google"
                size={iconSize}
                color={colors.white}
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
};

GoogleButton.propTypes = {
    callback: PropTypes.func,
};

export default GoogleButton;

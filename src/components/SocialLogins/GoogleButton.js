import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { colors } from '../../utils/styles';
import userDb from '../../database/User';
import { logger } from '../../utils/LogManager';

WebBrowser.maybeCompleteAuthSession();

const transparentStyle = { opacity: 0.9 };
const iconSize = 40;

const GoogleButton = ({ callback }) => {
    let request = null;
    let response = null;
    let promptAsync = () => {};

    React.useEffect(() => {
        async function signIn() {
            await GoogleSignIn.initAsync();
        }
        if (Constants.appOwnership !== 'expo') {
            signIn();
        }
    }, []);

    if (Constants.appOwnership === 'expo') {
        // eslint-disable-next-line no-unused-vars
        [request, response, promptAsync] = Google.useIdTokenAuthRequest(
            {
                expoClientId: process.env.WEB_CLIENT_ID,
            },
        );
        React.useEffect(() => {
            async function expoSignIn() {
                if (response?.type === 'success') {
                    // eslint-disable-next-line camelcase
                    const { id_token } = response.params;
                    const res = await userDb.socialSignIn('google', id_token);
                    callback(res);
                }
            }
            expoSignIn();
        }, [response]);
    }

    const authAsync = async () => {
        try {
            if (Constants.appOwnership === 'expo') {
                const url = Constants.linkingUri;
                console.log('redirect_url >>', url);

                const responseAsync = await promptAsync({ useProxy: true });
                console.log('responseAsync >>', responseAsync);
                console.log('request >>', request);
                console.log('response >>', response);

                logger.info('GoogleButton:expo:useIdTokenAuthRequest:result >> ', response);
            } else {
                await GoogleSignIn.askForPlayServicesAsync();
                const siginAsyncResult = await GoogleSignIn.signInAsync();
                logger.info('GoogleButton:signInAsync:result >> ', siginAsyncResult);
                const { type, user } = siginAsyncResult;
                if (type === 'success') {
                    const res = await userDb.socialSignIn('google', user.auth.idToken);
                    callback(res);
                }
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
                    authAsync();
                }}
            />
        </View>
    );
};

GoogleButton.propTypes = {
    callback: PropTypes.func,
};

export default GoogleButton;

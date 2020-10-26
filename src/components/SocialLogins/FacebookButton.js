import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-facebook';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../utils/styles';
import userDb from '../../database/User';
import { logger } from '../../utils/LogManager';

WebBrowser.maybeCompleteAuthSession();

const transparentStyle = { opacity: 0.9 };
const iconSize = 40;

const FacebookButton = ({ callback }) => {
    const promptAsync = async () => {
        try {
            await Facebook.initializeAsync(process.env.FB_APP_ID);
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                const res = await userDb.socialSignIn('facebook', token);
                callback(res);
            }
        } catch (e) {
            logger.error('FacebookButton:promptAsync:Error >>', e);
        }
    };

    return (
        <View>
            <FontAwesome
                style={transparentStyle}
                name="facebook"
                size={iconSize}
                color={colors.white}
                onPress={() => {
                    try {
                        promptAsync();
                    } catch (e) {
                        throw new Error(e.message);
                    }
                }}
            />
        </View>
    );
};

FacebookButton.propTypes = {
    callback: PropTypes.func,
};

export default FacebookButton;

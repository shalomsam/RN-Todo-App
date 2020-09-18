import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import firebase from 'firebase';
import { colors } from '../../utils/styles';

WebBrowser.maybeCompleteAuthSession();

const transparentStyle = { opacity: 0.9 };
const iconSize = 40;

const FacebookButton = () => {
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        responseType: ResponseType.Token,
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            // eslint-disable-next-line camelcase
            const { access_token } = response.params;

            const credential = firebase.auth.FacebookAuthProvider.credential(access_token);
            firebase.auth().signInWithCredential(credential);
        }
    }, [response]);

    if (!request) {
        return null;
    }

    return (
        <View>
            <FontAwesome
                style={transparentStyle}
                name="facebook"
                size={iconSize}
                color={colors.white}
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
};

export default FacebookButton;

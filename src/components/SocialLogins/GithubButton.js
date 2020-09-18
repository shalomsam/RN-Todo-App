import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import firebase from 'firebase';
import appConfig from '../../../app.json';
import { colors } from '../../utils/styles';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.GITHUB_CLIENT_ID}`,
};

const transparentStyle = { opacity: 0.9 };
const iconSize = 40;

const GithubButton = () => {
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: process.env.GITHUB_CLIENT_ID,
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                native: `${appConfig.expo.scheme}://`,
            }),
        },
        discovery,
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;

            const credentials = firebase.auth.GithubAuthProvider.credential(code);
            firebase.auth().signInWithCredential(credentials);
        }
    }, [response]);

    if (!request) {
        return null;
    }

    return (
        <View>
            <FontAwesome
                style={transparentStyle}
                name="github"
                size={iconSize}
                color={colors.white}
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
};

export default GithubButton;

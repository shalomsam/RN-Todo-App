import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, startAsync } from 'expo-auth-session';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../utils/styles';
import user from '../../database/User';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.GITHUB_CLIENT_ID}`,
};

const redirectOptions = {
    expo: {
        useProxy: true,
    },
    standalone: {
        native: 'com.shalomsam.organiizr://redirect',
        useProxy: false,
    },
    default: {
        useProxy: true,
    },
};

const clientIds = {
    expo: process.env.GITHUB_CLIENT_ID_EXPO_W_PROXY,
    standalone: process.env.GITHUB_CLIENT_ID_EXPO_W_PROXY,
    default: process.env.GITHUB_CLIENT_ID_EXPO_W_PROXY,
};

const secretKeys = {
    expo: process.env.GITHUB_SECRET_EXPO_W_PROXY,
    standalone: process.env.GITHUB_SECRET_EXPO_W_PROXY,
    default: process.env.GITHUB_SECRET_EXPO_W_PROXY,
};

// const selectionKey = Constants.appOwnership || 'default';
const selectionKey = 'standalone';
const selectedOptions = redirectOptions[selectionKey];
const redirectUri = makeRedirectUri(selectedOptions);
const clientId = clientIds[selectionKey];
const secret = secretKeys[selectionKey];
const scopes = ['identity'];

const transparentStyle = { opacity: 0.9 };
const iconSize = 40;

const GithubButton = ({ callback }) => {
    const getAuthUrl = () => `${discovery.authorizationEndpoint}`
            + `?client_id=${clientId}`
            + `&redirect_url=${encodeURIComponent(redirectUri)}`
            + `&scope=${encodeURIComponent(scopes.join(' '))}`;

    const getToken = async (code) => {
        const url = `${discovery.tokenEndpoint}`
            + `?client_id=${clientId}`
            + `&client_secret=${secret}`
            + `&code=${code}`;

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        return res.json();
    };

    const promptAsync = async () => {
        try {
            const { params } = await startAsync({
                authUrl: getAuthUrl(),
            });
            // eslint-disable-next-line camelcase
            const { access_token } = await getToken(params.code);
            const res = await user.socialSignIn('github', access_token);
            callback(res);
        } catch (e) {
            callback({ status: 'error', ...e });
            throw new Error(e.message);
        }
    };

    return (
        <View>
            <FontAwesome
                style={transparentStyle}
                name="github"
                size={iconSize}
                color={colors.white}
                onPress={() => {
                    promptAsync({
                        useProxy: selectedOptions.useProxy,
                    });
                }}
            />
        </View>
    );
};

GithubButton.propTypes = {
    callback: PropTypes.func,
};

export default GithubButton;

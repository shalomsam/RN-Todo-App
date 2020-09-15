import React from 'react';
import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
import * as Google from 'expo-auth-session/providers/google';
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';
import { colors } from '../../utils/styles';
// import * as GoogleAuth from 'expo-google-sign-in';
import firebase from 'firebase';

WebBrowser.maybeCompleteAuthSession();

const transparentStyle = { opacity: 0.9 };
const iconSize = 40;

const GoogleButton = () => {

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: process.env.WEB_CLIENT_ID
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          
          const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
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
                name="google"
                size={iconSize}
                color={colors.white}
                onPress={() => {
                    promptAsync()
                }}
            />
        </View>
    )
}

export default GoogleButton;

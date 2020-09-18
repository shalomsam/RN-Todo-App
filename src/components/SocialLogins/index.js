import React from 'react';
import { View } from 'react-native';
import { styles, gutter } from '../../utils/styles';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import GithubButton from './GithubButton';

const SocialLogins = () => (
    <View
        style={[
            styles.container,
            {
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                padding: gutter,
                margin: gutter,
            },
        ]}
    >
        <FacebookButton />
        <GoogleButton />
        <GithubButton />
    </View>
);

export default SocialLogins;

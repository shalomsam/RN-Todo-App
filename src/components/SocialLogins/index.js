import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { styles, gutter } from '../../utils/styles';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import GithubButton from './GithubButton';

const SocialLogins = ({ callback = () => {} }) => (
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
        <FacebookButton callback={callback} />
        <GoogleButton callback={callback} />
        <GithubButton callback={callback} />
    </View>
);

SocialLogins.propTypes = {
    callback: PropTypes.func,
};

export default SocialLogins;

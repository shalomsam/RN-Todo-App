import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

const Background = ({
    bgColors,
    style = {},
    children,
}) => {
    const isGradient = typeof bgColors !== 'string';
    const BgComponent = isGradient ? LinearGradient : View;

    return (
        <BgComponent
            style={style}
            colors={bgColors}
        >
            {children}
        </BgComponent>
    );
};

Background.propTypes = {
    bgColors: PropTypes.oneOf([PropTypes.array, PropTypes.string]).isRequired,
    style: PropTypes.object,
    children: PropTypes.any,
};

export default Background;

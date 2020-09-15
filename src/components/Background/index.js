import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import Unsplash from 'unsplash-js';

const Background = ({
    bgColors,
    style,
    children
}) => {
    const isGradient = typeof bgColors !== "string";
    const BgComponent = isGradient ? LinearGradient : View;
    
    return (
        <BgComponent
            style={style}
            colors={bgColors}
        >
            {children}
        </BgComponent>
    )
}

Background.propTypes = {
    bgColor: PropTypes.oneOf([PropTypes.array, PropTypes.string])
}

export default Background;
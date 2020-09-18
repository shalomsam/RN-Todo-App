import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../../utils/styles';

const Container = ({ containerStyles = {}, children }) => (
    <View style={[styles.container, containerStyles]}>{children}</View>
);

Container.propTypes = {
    containerStyles: PropTypes.object,
    children: PropTypes.any,
};

export default Container;

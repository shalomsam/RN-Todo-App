import React from 'react';
import { View } from 'react-native';
import { styles } from '../../utils/styles';

const Container = ({ containerStyles = {}, children }) => <View style={[styles.container, containerStyles]}>{children}</View>

export default Container;

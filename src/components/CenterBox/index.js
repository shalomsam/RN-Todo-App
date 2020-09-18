import React from 'react';
import { Card } from 'react-native-paper';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const CenterBox = ({ style = {}, children }) => (
    <View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        }}
    >
        <Card style={{
            ...style,
            width: '90%',
            padding: 15,
        }}
        >
            {children}
        </Card>
    </View>
);

CenterBox.propTypes = {
    style: PropTypes.object,
    children: PropTypes.any,
};

export default CenterBox;

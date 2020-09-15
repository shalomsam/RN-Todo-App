import React from 'react';
import { Card } from 'react-native-paper';
import { View } from 'react-native';

const CenterBox = ({ style = {}, children }) => {
    return (
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
                padding: 15
            }}>
                {children}
            </Card>
        </View>
    )
}

export default CenterBox;
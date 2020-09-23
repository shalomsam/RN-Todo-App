import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { bold, colors, fontSize, gutter } from '../../utils/styles';

const Divider = ({
    children,
    textBgColor = colors.white,
    textBgRadius = 50,
    overrideStyle = {},
}) => {
    const containerHeight = fontSize + (gutter * 2);
    const wrapperHeight = containerHeight / 2;
    return (
        <View
            style={[
                {
                    borderColor: colors.white,
                    borderBottomWidth: 1,
                    height: wrapperHeight,
                    textAlign: 'center',
                    marginVertical: gutter,
                },
                overrideStyle,
            ]}
        >
            <View
                style={{
                    height: containerHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        backgroundColor: textBgColor,
                        borderRadius: textBgRadius,
                        paddingVertical: 10,
                        paddingHorizontal: 13,
                        position: 'absolute',
                        textAlign: 'center',
                        ...bold,
                    }}
                >
                    {children}
                </Text>
            </View>
        </View>
    );
};

Divider.propTypes = {
    children: PropTypes.any,
    textBgColor: PropTypes.string,
    textBgRadius: PropTypes.number,
    overrideStyle: PropTypes.object,
};

export default Divider;

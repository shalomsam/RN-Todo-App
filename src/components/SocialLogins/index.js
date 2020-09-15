import React from 'react';
import { View } from 'react-native';
import { styles, colors, gutter } from '../../utils/styles';
import { FontAwesome } from '@expo/vector-icons';
import GoogleButton from './GoogleButton';

const SocialLogins = () => {
    const transparentStyle = { opacity: 0.9 };
    const iconSize = 40;
    return (
        <View
            style={[
                styles.container,
                {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // alignItems: "center",
                    padding: gutter,
                    margin: gutter,
                }
            ]}
        >
            <View>
                <FontAwesome
                    style={transparentStyle}
                    name="facebook"
                    size={iconSize}
                    color={colors.white}
                />
            </View>
            <GoogleButton />
            <View>
                <FontAwesome
                    style={transparentStyle}
                    name="twitter"
                    size={iconSize}
                    color={colors.white}
                />
            </View>
        </View>
    )
}

export default SocialLogins;
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles, typography, colors } from '../../utils/styles';

const localStyles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconRight: {
        position: 'absolute',
        right: 5,
        color: colors.tertiary,
    },
    iconLeft: {
        color: colors.primary,
        paddingRight: 10,
    },
});

const ListItem = (props) => {
    const { item } = props;
    const listTitle = item.name;
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={(e) => props.onPressAction(item, e)}
        >
            <View style={localStyles.container}>
                <Ionicons
                    style={localStyles.iconLeft}
                    size={25}
                    name="ios-list"
                />
                <Text style={[typography.h4]}>
                    { listTitle.charAt(0).toUpperCase() }
                    { listTitle.slice(1) }
                </Text>
                <FontAwesome
                    style={localStyles.iconRight}
                    size={20}
                    name="chevron-circle-right"
                />
            </View>
        </TouchableOpacity>
    );
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onPressAction: PropTypes.func.isRequired,
};

export default ListItem;

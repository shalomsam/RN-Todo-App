import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../../utils/styles';

export default class SimpleModal extends React.PureComponent {
    render() {
        const {
            title,
            visible,
            buttons,
            children,
            closeAction,
        } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent
                visible={visible}
            >
                <TouchableWithoutFeedback
                    onPress={closeAction}
                >
                    <View style={styles.modalBackdrop}>
                        <View style={styles.modalStyle}>
                            <View>
                                <Text style={styles.modalTitle}>{title}</Text>
                            </View>
                            <View>
                                {children}
                            </View>
                            <View>
                                {buttons}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

SimpleModal.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    buttons: PropTypes.arrayOf(PropTypes.element),
    closeAction: PropTypes.func.isRequired,
};

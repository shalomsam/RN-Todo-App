import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles as GlobalStyles } from '../../utils/styles';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        ...GlobalStyles.modalStyle,
    },
    dialogTitle: {
        fontSize: GlobalStyles.fontSize,
        color: '#333',
    },
    btnsWrp: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    continueBtn: {
        ...GlobalStyles.btnActive,
    },
    continueBtnTxt: {
        ...GlobalStyles.btnTextActive,
    },
    cancelBtn: {
        ...GlobalStyles.btn,
    },
    cancelBtnTxt: {
        ...GlobalStyles.btnText,
    },
});

const DeleteAllModal = ({
    currentFilter,
    visible,
    onContinue,
    cancel,
}) => {
    const filterType = currentFilter === 'all' ? currentFilter : `all ${currentFilter}`;
    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={() => {
                console.log('Modal has been closed.');
            }}
        >
            <View style={GlobalStyles.modalBackdrop}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.dialogTitle}>
                            This action will delete
                            {filterType}
                            Todo(s). Do you want to continue?
                        </Text>
                    </View>
                    <View style={styles.btnsWrp}>
                        <TouchableHighlight
                            style={styles.continueBtn}
                            onPress={onContinue}
                        >
                            <Text style={styles.continueBtnTxt}>Continue</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.cancelBtn}
                            onPress={cancel}
                        >
                            <Text style={styles.cancelBtnTxt}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

DeleteAllModal.propTypes = {
    currentFilter: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onContinue: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
};

export default DeleteAllModal;

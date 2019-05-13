import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { styles as GlobalStyles } from '../../utils/styles';
import PropTypes from 'prop-types';

const DeleteAllModal = (props) => {
  const filterType = props.currentFilter === 'all' ? props.currentFilter : `all ${props.currentFilter}`;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}
    >
      <View style={GlobalStyles.modalBackdrop}>
        <View style={styles.container}>
          <View>
            <Text style={styles.dialogTitle}>This action will delete { filterType } Todo(s). Do you want to continue?</Text>
          </View>
          <View style={styles.btnsWrp}>
            <TouchableHighlight
              style={styles.continueBtn}
              onPress={props.continue}
            >
              <Text style={styles.continueBtnTxt}>Continue</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.cancelBtn}
              onPress={props.cancel}
            >
              <Text style={styles.cancelBtnTxt}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    ...GlobalStyles.modalStyle
  },
  dialogTitle: {
    fontSize: GlobalStyles.fontSize,
    color: '#333'
  },
  btnsWrp: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  continueBtn: {
    ...GlobalStyles.btnActive,
  },
  continueBtnTxt: {
    ...GlobalStyles.btnTextActive
  },
  cancelBtn: {
    ...GlobalStyles.btn
  },
  cancelBtnTxt: {
    ...GlobalStyles.btnText
  }
});

DeleteAllModal.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  continue: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}

export default DeleteAllModal;

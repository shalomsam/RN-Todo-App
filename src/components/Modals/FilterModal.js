import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { styles as GlobalStyles } from '../../utils/styles';
import PropTypes from 'prop-types';

const FilterModal = (props) => {

  const filterBtns = props.filterTypes.map((filter, i) => {

    const btnStyle = props.selected === filter ? styles.filterBtnActive : styles.filterBtn;
    const btnTxtStyle = props.selected === filter ? styles.filterBtnActiveTxt : styles.filterBtnTxt;

    return (
      <TouchableHighlight
        key={i}
        style={btnStyle}
        onPress={() => props.selectFilter(filter)}
      >
        <Text style={btnTxtStyle}>{filter}</Text>
      </TouchableHighlight>
    )
  });

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
        <View style={styles.contentWrp}>
          <View>
            <Text style={styles.modalTitle}>Select Filter Type:</Text>
          </View>
          <View style={styles.btnsWrp}>
            {filterBtns}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  contentWrp: {
    ...GlobalStyles.modalStyle
  },
  modalTitle: {
    fontSize: GlobalStyles.fontSize,
    fontWeight: 'bold',
    color: '#333',
  },
  btnsWrp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  filterBtn: {
    ...GlobalStyles.btn
  },
  filterBtnActive: {
    ...GlobalStyles.btnActive
  },
  filterBtnTxt: {
    ...GlobalStyles.btnText
  },
  filterBtnActiveTxt: {
    ...GlobalStyles.btnTextActive
  }
});

FilterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  selected: PropTypes.string.isRequired,
  selectFilter: PropTypes.func.isRequired,
  filterTypes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FilterModal;

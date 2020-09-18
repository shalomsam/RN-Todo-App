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
    modalTitle: {
        fontSize: GlobalStyles.fontSize,
        fontWeight: 'bold',
        color: '#333',
    },
    btnsWrp: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    filterBtn: {
        ...GlobalStyles.btn,
    },
    filterBtnActive: {
        ...GlobalStyles.btnActive,
    },
    filterBtnTxt: {
        ...GlobalStyles.btnText,
    },
    filterBtnActiveTxt: {
        ...GlobalStyles.btnTextActive,
    },
});

const FilterModal = ({
    filterTypes,
    selected,
    selectFilter,
    visible,
}) => {
    const filterBtns = filterTypes.map((filter, i) => {
        const btnStyle = selected === filter ? styles.filterBtnActive : styles.filterBtn;
        const btnTxtStyle = selected === filter ? styles.filterBtnActiveTxt : styles.filterBtnTxt;

        return (
            <TouchableHighlight
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                style={btnStyle}
                onPress={() => selectFilter(filter)}
            >
                <Text style={btnTxtStyle}>{filter}</Text>
            </TouchableHighlight>
        );
    });

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
                <View style={GlobalStyles.modalStyle}>
                    <View>
                        <Text style={styles.modalTitle}>Select Filter Type:</Text>
                    </View>
                    <View style={styles.btnsWrp}>
                        {filterBtns}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

FilterModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    selected: PropTypes.string.isRequired,
    selectFilter: PropTypes.func.isRequired,
    filterTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterModal;

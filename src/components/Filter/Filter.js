import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles as GlobalStyles } from '../../utils/styles';
import PropTypes from 'prop-types';
import FilterModal from '../Modals/FilterModal';
import DeleteAllModal from '../Modals/DeleteAllModal';

export default class Filter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showFilterDialog: false,
      showDeleteAllDialog: false
    }
  }

  selectFilter = (filter) => {
    this.setState({ showFilterDialog: false });
    this.props.selectFilter(filter);
  }

  continue = () => {
    this.setState({ showDeleteAllDialog: false });
    this.props.deleteContinue();
  }

  cancel = () => {
    this.setState({ showDeleteAllDialog: false });
    this.props.deleteCancel();
  }

  render() {
    return (
      <View style={styles.filterWrp}>
        <View style={styles.filterTitleWrp}>
          <Text style={styles.filterTitle}>{this.props.filterTitle}</Text>
        </View>
        <View style={styles.filterBtnWrp}>
          <MaterialCommunityIcons 
            name='filter'
            size={GlobalStyles.iconSize}
            color={'rgba(255,255,255,0.7)'}
            onPress={() => this.setState({ showFilterDialog: true })}
          />
          <MaterialIcons
            name="delete-sweep"
            size={GlobalStyles.iconSize}
            color={'rgba(255,255,255,0.7)'}
            onPress={() => this.setState({ showDeleteAllDialog: true })}
          />
        </View>
        <FilterModal
          visible={this.state.showFilterDialog}
          selected={this.props.currentFilter}
          selectFilter={this.selectFilter}
          filterTypes={this.props.filterTypes}
        />
        <DeleteAllModal
          visible={this.state.showDeleteAllDialog}
          currentFilter={this.props.currentFilter}
          continue={this.continue}
          cancel={this.cancel}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  filterWrp: {
    marginBottom: 5,
    height: 30,
    flexDirection: 'row',
  },
  filterTitleWrp: {
    width: '80%'
  },
  filterTitle: {
    fontSize: GlobalStyles.fontSize,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold'
  },
  filterBtnWrp: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

Filter.propTypes = {
  filterTitle: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
  filterTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteContinue: PropTypes.func.isRequired,
  deleteCancel: PropTypes.func.isRequired,
  selectFilter: PropTypes.func.isRequired
}

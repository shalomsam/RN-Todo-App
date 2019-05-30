import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { styles as GlobalStyles } from '../../utils/styles';
import FilterModal from '../Modals/FilterModal';
import DeleteAllModal from '../Modals/DeleteAllModal';

const styles = StyleSheet.create({
  filterWrp: {
    marginBottom: 5,
    height: 30,
    flexDirection: 'row',
  },
  filterTitleWrp: {
    width: '80%',
  },
  filterTitle: {
    fontSize: GlobalStyles.fontSize,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
  },
  filterBtnWrp: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilterDialog: false,
      showDeleteAllDialog: false,
    };
  }

  selectFilter = (filter) => {
    const { selectFilter } = this.props;
    this.setState({ showFilterDialog: false });
    selectFilter(filter);
  }

  continue = () => {
    const { deleteContinue } = this.props;
    this.setState({ showDeleteAllDialog: false });
    deleteContinue();
  }

  cancel = () => {
    const { deleteCancel } = this.props;
    this.setState({ showDeleteAllDialog: false });
    deleteCancel();
  }

  render() {
    const { filterTitle, currentFilter, filterTypes } = this.props;
    const { showFilterDialog, showDeleteAllDialog } = this.state;
    return (
      <View style={styles.filterWrp}>
        <View style={styles.filterTitleWrp}>
          <Text style={styles.filterTitle}>{filterTitle}</Text>
        </View>
        <View style={styles.filterBtnWrp}>
          <MaterialCommunityIcons
            name="filter"
            size={GlobalStyles.iconSize}
            color="rgba(255,255,255,0.7)"
            onPress={() => this.setState({ showFilterDialog: true })}
          />
          <MaterialIcons
            name="delete-sweep"
            size={GlobalStyles.iconSize}
            color="rgba(255,255,255,0.7)"
            onPress={() => this.setState({ showDeleteAllDialog: true })}
          />
        </View>
        <FilterModal
          visible={showFilterDialog}
          selected={currentFilter}
          selectFilter={this.selectFilter}
          filterTypes={filterTypes}
        />
        <DeleteAllModal
          visible={showDeleteAllDialog}
          currentFilter={currentFilter}
          onContinue={this.continue}
          cancel={this.cancel}
        />
      </View>
    );
  }
}

Filter.propTypes = {
  filterTitle: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
  filterTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteContinue: PropTypes.func.isRequired,
  deleteCancel: PropTypes.func.isRequired,
  selectFilter: PropTypes.func.isRequired,
};

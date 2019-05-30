import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = (props) => {
  const { items } = props;
  const listKeys = Object.keys(items);

  const listItems = listKeys.map((listKey, i) => {
    const _list = items[listKey];
    const key = `List-${i}`;
    return (
      <ListItem
        key={key}
        item={_list}
        onPressAction={props.onPressAction}
      />
    );
  });

  return (
    <View>
      {listItems}
    </View>
  );
};

List.propTypes = {
  items: PropTypes.object,
  onPressAction: PropTypes.func,
};

export default List;

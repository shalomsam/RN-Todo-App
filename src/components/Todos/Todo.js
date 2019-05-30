import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import { styles as GlobalStyles } from '../../utils/styles';


const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowOffset: { height: 2, width: 0 },
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    elevation: 5,
    position: 'relative',
  },
  todoTitle: {
    fontSize: 18,
    paddingLeft: 15,
    width: '80%',
  },
  titleComplete: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  deleteIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

const Todo = (props) => {
  const {
    completed,
    index,
    checkBoxToggle,
    title,
    onDelete,
  } = props;
  const todoCheckIcon = completed ? 'check-square-o' : 'square-o';
  const todoCheckIconColor = completed ? 'green' : '#333';
  const titleStyle = completed ? [styles.todoTitle, styles.titleComplete] : [styles.todoTitle];

  return (
    <View style={styles.todoContainer}>
      <FontAwesome
        name={todoCheckIcon}
        size={GlobalStyles.iconSize}
        color={todoCheckIconColor}
        onPress={() => checkBoxToggle(index)}
      />
      <Text style={titleStyle}>{title}</Text>
      {completed
        && (
          <MaterialIcons
            style={styles.deleteIcon}
            name="delete-forever"
            size={GlobalStyles.iconSize}
            color="red"
            onPress={() => onDelete(index)}
          />
        )
      }
    </View>
  );
};

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  checkBoxToggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Todo;

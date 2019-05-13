import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Todo from './Todo';
import { styles as GlobalStyles } from '../../utils/styles';

const Todos = (props) => {
  let todos = <Text style={styles.noTodo}>No TODOs</Text>;
  if (props.todos.length) {
    todos = props.todos.map((item, i) => {
      return (
        <Todo
          key={i} 
          index={i} 
          title={item.title}
          completed={item.completed}
          checkBoxToggle={props.checkBoxToggle}
          onDelete={props.onDelete}
        />
      );
    });
  }
  
  return todos;
}

const styles = StyleSheet.create({
  noTodo: {
    fontSize: GlobalStyles.fontSize,
    color: GlobalStyles.fontColor,
    fontWeight: 'bold'
  }
});

export default Todos;

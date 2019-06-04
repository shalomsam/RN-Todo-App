import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Todo from './Todo';
import { styles as GlobalStyles } from '../../utils/styles';


const styles = StyleSheet.create({
  noTodo: {
    fontSize: GlobalStyles.fontSize,
    color: GlobalStyles.fontColor,
    fontWeight: 'bold',
  },
});

const Todos = (props) => {
  const { todos, checkBoxToggle, onDelete } = props;
  let todosEl = <Text style={styles.noTodo}>No TODOs</Text>;

  if (todos !== undefined) {
    const todoKeys = Object.keys(todos);
    todosEl = todoKeys.map((todoKey) => {
      const todo = todos[todoKey];
      return (
        <Todo
          key={todo.key}
          id={todo.key}
          title={todo.title}
          completed={todo.completed}
          checkBoxToggle={checkBoxToggle}
          onDelete={onDelete}
        />
      );
    });
  }
  return todosEl;
};

export default Todos;

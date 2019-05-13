import * as React from 'react';
import { StatusBar, View, TextInput, StyleSheet, ScrollView, Text, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import { styles as GlobalStyles } from './utils/styles';
import { Header } from './components/Header';
import Todos from './components/Todos/Todos';
import Filter from './components/Filter/Filter';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.filters = ['all', 'active', 'completed'];
    this.state = {
      todo: '',
      inputError: false,
      loading: true,
      todos: [],
      currentFilter: 'all'
    };

    this.loadTodos();
  }

  loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      this.setState({
        todos: JSON.parse(todos) || [],
        loading: false
      });
    } catch (e) {
      console.log("Error getting Todo Items >", e);
    }
  };

  save = async () => {
    try {
      AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));
    } catch (e) {
      console.log('Error while storing Todo Items >', e);
    }
  };

  addTodo = () => {
    if (this.state.todo.length === 0) {
      this.setState({ inputError: true });
      return;
    }
    const todos = this.state.todos;
    const todo = {
      title: this.state.todo,
      completed: false,
      createdOn: Date.now(),
      notes: '',
      dueDate: null,
      remindMe: false,
      completedOn: null,
    };
    todos.push(todo);
    this.setState({ todos, todo: '' }, this.save);
  };

  checkBoxToggle = (i) => {
    const todos = this.state.todos;
    const todo = todos[i];
    todo.completed = !todo.completed;
    todo.completedOn = todo.completed ? Date.now() : null;
    todos[i] = todo;
    this.setState({ todos }, this.save);
  };

  onDeleteAction = (i) => {
    const todos = this.state.todos;
    todos.splice(i, 1);
    this.setState({ todos }, this.save);
  };

  deleteAllContinue = () => {
    const filterType = this.state.currentFilter;
    const todos = this.state.todos;
    let todosFiltered = [];
    if (filterType !== 'all') {
      todosFiltered = todos.filter((todo) => {
        if (filterType === 'active') {
          return todo.completed === true;
        } else {
          return todo.completed === false;
        }
      });
    }

    this.setState({ todos: todosFiltered, currentFilter: 'all' }, this.save);
  }

  deleteAllCancel = () => {
    console.log('Delete All canceled!');
  }

  selectFilter = (filter) => {
    this.setState({ currentFilter: filter });
  }

  render() {
    let todos = this.state.todos;
    if (this.state.currentFilter !== 'all') {
      todos = todos.filter((todo) => {
        if (this.state.currentFilter === 'active') {
          return todo.completed === false;
        } else if (this.state.currentFilter === 'completed') {
          return todo.completed === true;
        }
      });
    }
    return (
      <LinearGradient style={{flex: 1}} colors={GlobalStyles.appBackgroundColors}>
        <StatusBar barStyle='light-content' />
        <Header title='Todo App' />
        <View style={styles.container}>
          <TextInput 
            style={styles.textInput} 
            autoCapitalize='sentences'
            placeholder='What needs to be done?'
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            onChangeText={todo => this.setState({ todo }) }
            blurOnSubmit={false}
            onSubmitEditing={this.addTodo}
            value={this.state.todo}
          />
          <View style={styles.todosWrp}>
            <Filter
              filterTitle="Your Todos"
              currentFilter={this.state.currentFilter}
              filterTypes={this.filters}
              deleteContinue={this.deleteAllContinue}
              deleteCancel={this.deleteAllCancel}
              selectFilter={this.selectFilter}
            />
            <ScrollView>
              <Todos 
                todos={todos}
                checkBoxToggle={this.checkBoxToggle}
                onDelete={this.onDeleteAction}
              />
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  textInput: {
    color: GlobalStyles.fontColor,
    fontSize: 28,
    fontStyle: 'italic'
  },
  listHeaderWrp: {
    marginBottom: 10
  },
  listHeader: {
    fontSize: GlobalStyles.fontSize,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  todosWrp: {
    marginTop: 20
  }
});

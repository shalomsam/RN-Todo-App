import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import md5 from 'md5';
import { styles as GlobalStyles } from '../utils/styles';
import Header from '../components/UI/Header';
import Todos from '../components/Todos/Todos';
import Filter from '../components/Filter/Filter';
import TodosDb from '../database/Todos';


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    color: GlobalStyles.fontColor,
    fontSize: 28,
    fontStyle: 'italic',
  },
  listHeaderWrp: {
    marginBottom: 10,
  },
  listHeader: {
    fontSize: GlobalStyles.fontSize,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  todosWrp: {
    marginTop: 20,
  },
});

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.FILTER_ALL = 'all';
    this.FILTER_ACTIVE = 'active';
    this.FILTER_COMPLETE = 'completed';
    this.filters = ['all', 'active', 'completed'];

    this.state = {
      todo: '',
      currentFilter: 'all',
      currentUser: null,
      selectedList: {
        key: null,
        name: null,
        owner: null,
        userEmails: {},
        todos: {},
      },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const list = navigation.getParam('selectedList');
    const currentUser = navigation.getParam('currentUser');
    this.setState({ selectedList: list, currentUser });
  }

  save = async () => {
    const { selectedList, currentUser } = this.state;
    try {
      TodosDb.setTodos(selectedList, currentUser.uid);
    } catch (e) {
      console.log('Error while storing Todo Items >', e);
    }
  };

  addTodo = () => {
    const { todo, selectedList } = this.state;
    const todos = selectedList.todos || {};
    if (todo.length === 0) {
      // this.setState({ inputError: true });
      return;
    }
    const todoKey = md5(todo);
    const todoNew = {
      key: todoKey,
      title: todo,
      completed: false,
      createdOn: Date.now(),
      notes: '',
      dueDate: null,
      remindMe: false,
      completedOn: null,
    };

    todos[todoKey] = todoNew;
    selectedList.todos = todos;
    this.setState({ selectedList, todo: '' }, this.save);
  };

  checkBoxToggle = (todoKey) => {
    const { selectedList } = this.state;
    const todo = selectedList.todos[todoKey];

    todo.completed = !todo.completed;
    todo.completedOn = todo.completed ? Date.now() : null;
    selectedList.todos[todoKey] = todo;
    this.setState({ selectedList }, this.save);
  };

  onDeleteAction = (todoKey) => {
    const { selectedList } = this.state;
    delete selectedList.todos[todoKey];
    this.setState({ selectedList }, this.save);
  };

  deleteAllContinue = () => {
    const { selectedList } = this.state;
    const { todos } = selectedList;

    const todoKeys = Object.keys(todos);
    todoKeys.map((todoKey) => {
      if (this._shouldDeleteTodo(todos[todoKey])) {
        delete todos[todoKey];
      }

      return null;
    });

    selectedList.todos = todos;
    this.setState({ selectedList, currentFilter: 'all' }, this.save);
  }

  _shouldDeleteTodo = (todo) => {
    const { currentFilter } = this.state;

    return (currentFilter === this.FILTER_ACTIVE && !todo.completed)
      || (currentFilter === this.FILTER_COMPLETE && todo.completed)
      || currentFilter === this.FILTER_ALL;
  }

  deleteAllCancel = () => {
    // eslint-disable-next-line no-console
    console.log('Delete All canceled!');
  }

  selectFilter = (filter) => {
    this.setState({ currentFilter: filter });
  }

  render() {
    const { navigation } = this.props;
    const { currentFilter, todo, selectedList } = this.state;
    let { todos } = selectedList;

    if (currentFilter !== 'all') {
      const todoKeys = Object.values(todos);
      todos = {};
      todoKeys.map((_todo) => {
        if ((currentFilter === this.FILTER_ACTIVE && _todo.completed === false)
          || (currentFilter === this.FILTER_COMPLETE && _todo.completed)) {
          todos[_todo.key] = _todo;
        }
        return null;
      });
    }

    return (
      <LinearGradient style={{ flex: 1 }} colors={GlobalStyles.appBackgroundColors}>
        <Header
          title="Tasks"
          backgroundColor="transparent"
          iconLeft={(
            <FontAwesome
              style={{ position: 'absolute', left: 10 }}
              name="chevron-left"
              size={20}
              color="white"
              onPress={() => navigation.goBack()}
            />
          )}
        />
        <View style={styles.container}>
          <TextInput
            style={[styles.textInput, { color: 'white' }]}
            autoCapitalize="sentences"
            placeholder="What needs to be done?"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            onChangeText={input => this.setState({ todo: input })}
            blurOnSubmit={false}
            onSubmitEditing={this.addTodo}
            value={todo}
          />
          <View style={styles.todosWrp}>
            <Filter
              filterTitle="Your Todos"
              currentFilter={currentFilter}
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

Tasks.propTypes = {
  navigation: PropTypes.object.isRequired,
};

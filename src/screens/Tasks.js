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

    this.filters = ['all', 'active', 'completed'];

    this.state = {
      todo: '',
      currentFilter: 'all',
      currentUser: null,
      selectedList: {
        key: null,
        name: null,
        userEmails: [],
        todos: [],
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
    const todos = selectedList.todos || [];
    if (todo.length === 0) {
      // this.setState({ inputError: true });
      return;
    }
    const todoNew = {
      title: todo,
      completed: false,
      createdOn: Date.now(),
      notes: '',
      dueDate: null,
      remindMe: false,
      completedOn: null,
    };
    todos.push(todoNew);
    selectedList.todos = todos;
    this.setState({ selectedList, todo: '' }, this.save);
  };

  checkBoxToggle = (i) => {
    const { selectedList } = this.state;
    const todo = selectedList.todos[i];

    todo.completed = !todo.completed;
    todo.completedOn = todo.completed ? Date.now() : null;
    selectedList.todos[i] = todo;
    this.setState({ selectedList }, this.save);
  };

  onDeleteAction = (i) => {
    const { selectedList } = this.state;
    selectedList.todos.splice(i, 1);
    this.setState({ selectedList }, this.save);
  };

  deleteAllContinue = () => {
    const { currentFilter, selectedList } = this.state;

    let todosFiltered = [];
    if (currentFilter !== 'all') {
      todosFiltered = selectedList.todos.filter((todo) => {
        if (currentFilter === 'active') {
          return todo.completed === true;
        }

        return todo.completed === false;
      });
    }

    selectedList.todos = todosFiltered;
    this.setState({ selectedList, currentFilter: 'all' }, this.save);
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
      todos = todos.filter((item) => {
        if (currentFilter === 'active') {
          return item.completed === false;
        }
        return item.completed === true;
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

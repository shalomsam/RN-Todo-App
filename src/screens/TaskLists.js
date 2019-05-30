import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
import { styles, colors, textInputs } from '../utils/styles';
import List from '../components/List/List';
import todosDb from '../database/Todos';
import Header from '../components/UI/Header';
import Buttons from '../components/UI/Buttons';
import SimpleModal from '../components/Modals/SimpleModal';

export default class TaskLists extends React.Component {
  constructor(props) {
    super(props);

    this.listDefault = {
      key: null,
      name: null,
      owner: null,
      userEmails: [],
      todos: [],
    };

    this.state = {
      list: null,
      listItem: this.listDefault,
      showAddNewListModal: false,
      listNameErr: null,
      emailErr: false,
      email: '',
      createBtnLoading: false,
      currentUser: null,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('currentUser')
      .then((data) => {
        const currentUser = JSON.parse(data);
        const { listItem } = this.state;
        listItem.owner = currentUser.email;
        listItem.userEmails.push(currentUser.email);
        this.setState({ listItem, currentUser });

        todosDb.getTodoList(currentUser.uid).then((list) => {
          this.setState({
            list,
          });
        }).catch((e) => {
          console.log('TaskList CDM error >>', e);
        });
      })
      .catch((e) => {
        console.log('Error getting user in TaskList >>', e);
      });
  }

  onPressAction = (item) => {
    const { navigation } = this.props;
    const { currentUser } = this.state;
    navigation.navigate('Todos', { currentUser, selectedList: item });
  }

  showAddNewList = () => {
    this.setState({ showAddNewListModal: true });
  }

  renderAddListButton = () => (
    <View>
      <Text style={{ color: colors.white }}>No Lists Found!</Text>
      <Buttons
        type="tertiary"
        title="Add New Todo List"
        onPress={this.showAddNewList}
      />
    </View>
  )

  showAddedEmails = () => {
    const { listItem } = this.state;
    return listItem.userEmails.map((email, i) => {
      let owner = null;
      const key = `email-${i}`;

      if (email === listItem.owner) {
        owner = <Text>Owner</Text>;
      }
      return (
        <View key={key}>
          <Text>
            {email}
            {owner}
          </Text>
        </View>
      );
    });
  }

  addEmailToList = () => {
    const { listItem } = this.state;
    let { email } = this.state;
    listItem.userEmails.push(email);
    email = '';
    this.setState({ listItem, email });
  }

  createAndAddList = async () => {
    this.setState({ createBtnLoading: true });

    const { listItem, currentUser } = this.state;
    let { list } = this.state;

    listItem.key = listItem.name.toLowerCase().replace(' ', '-');
    list = list || {};
    list[listItem.key] = listItem;

    try {
      await todosDb.addTodoList(listItem, currentUser.uid);
      this.setState({
        list,
        createBtnLoading: false,
        listItem: this.listDefault,
        showAddNewListModal: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      list,
      listItem,
      showAddNewListModal,
      listNameErr,
      emailErr,
      email,
      createBtnLoading,
    } = this.state;

    let listLen = 0;
    let content = null;

    if (list !== null) {
      const keys = Object.keys(list);
      listLen = keys.length;
    }

    if (listLen === 0) {
      content = this.renderAddListButton();
    } else {
      content = <List items={list} onPressAction={this.onPressAction} />;
    }

    const nameInputStyle = listNameErr ? textInputs.error : textInputs.default;
    const userInputStyle = emailErr ? textInputs.error : textInputs.default;

    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={styles.appBackgroundColors}
      >
        <Header
          title="List"
          iconRight={(
            <FontAwesome
              style={{ position: 'absolute', right: 10 }}
              name="plus"
              size={20}
              color="white"
              onPress={this.showAddNewList}
            />
          )}
          backgroundColor="transparent"
        />
        <View style={[styles.container, { justifyContent: 'flex-start' }]}>
          <ScrollView>
            { content }
          </ScrollView>
        </View>

        {/* Modal */}
        <SimpleModal
          title="Add new list:"
          visible={showAddNewListModal}
          closeAction={() => this.setState({ showAddNewListModal: false })}
        >
          <TextInput
            placeholder="List Name"
            autoCapitalize="none"
            style={nameInputStyle}
            onChange={({ nativeEvent }) => {
              listItem.name = nativeEvent.text;
              this.setState({ listItem });
            }}
            value={listItem.name}
          />
          <Text>Add users:</Text>
          {this.showAddedEmails()}
          <TextInput
            placeholder="email"
            autoCapitalize="none"
            style={userInputStyle}
            onChange={({ nativeEvent }) => {
              this.setState({ email: nativeEvent.text });
            }}
            value={email}
            onSubmitEditing={this.addEmailToList}
          />
          <Buttons
            type="primary"
            title="Add List"
            onPress={this.createAndAddList}
            isLoading={createBtnLoading}
          />
        </SimpleModal>
      </LinearGradient>
    );
  }
}

TaskLists.propTypes = {
  navigation: PropTypes.object.isRequired,
};

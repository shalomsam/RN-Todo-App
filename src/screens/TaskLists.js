import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import md5 from 'md5';
// eslint-disable-next-line import/no-extraneous-dependencies
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import { styles, colors, textInputs } from '../utils/styles';
import List from '../components/List/List';
import ListsDb from '../database/Lists';
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
      userEmails: {},
      todos: {},
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
      loading: true,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('currentUser')
      .then((data) => {
        const currentUser = JSON.parse(data);
        const { listItem } = this.state;
        const { userEmails } = listItem;
        listItem.owner = currentUser.email;
        // listItem.userEmails.push(currentUser.email);
        const emailKey = md5(currentUser.email);

        userEmails[emailKey] = this.addUnverifiedUserToList(emailKey, currentUser.email);

        this.setState({ listItem, currentUser });

        ListsDb.getTodoList(currentUser.uid).then((list) => {
          this.setState({
            list,
            loading: false,
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
    navigation.navigate('Todos', { currentUser, selectedList: item, deleteListAction: this.deleteList });
  }

  deleteList = (listId) => {
    const { currentUser, list } = this.state;
    ListsDb.deleteTodoList(listId, currentUser.uid)
      .then(() => {
        delete list[listId];
        this.setState(list);
      });
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
    const { userEmails } = listItem;
    const emailKeys = Object.keys(userEmails);

    return emailKeys.map((emailKey) => {
      let owner = null;
      const listUser = userEmails[emailKey];

      if (listUser.email === listItem.owner) {
        owner = <Text>Owner</Text>;
      }
      return (
        <View key={emailKey}>
          <Text>
            {listUser.email}
            {owner}
          </Text>
        </View>
      );
    });
  }

  addEmailToList = () => {
    const { listItem } = this.state;
    const { userEmails } = listItem;
    let { email } = this.state;
    const emailKey = md5(email);

    userEmails[emailKey] = this.addUnverifiedUserToList(emailKey, email);
    listItem.userEmails = userEmails;
    ListsDb.updateTodoList(listItem);
    email = '';
    this.setState({ listItem, email });
  }

  addUnverifiedUserToList = (key, email, isSignedUp = false, deepLink = '') => ({
    key,
    email,
    isSignedUp,
    deepLink,
  })

  createAndAddList = async () => {
    this.setState({ createBtnLoading: true });

    const { listItem, currentUser } = this.state;
    let { list } = this.state;

    listItem.key = uuid();
    list = list || {};
    list[listItem.key] = listItem;

    try {
      await ListsDb.addTodoList(listItem, currentUser.uid, listItem.key);
      this.setState({
        email: '',
        list,
        createBtnLoading: false,
        listItem: {
          ...this.listDefault,
          name: null,
        },
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
      loading,
    } = this.state;

    let listLen = 0;
    let content = null;

    if (list !== null) {
      const keys = Object.keys(list);
      listLen = keys.length;
    }

    if (loading) {
      content = (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={30} color="white" />
        </View>
      );
    } else if (listLen === 0) {
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

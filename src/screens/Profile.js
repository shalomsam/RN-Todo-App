import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { styles } from '../utils/styles';
import user from '../database/User';
import Buttons from '../components/UI/Buttons';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
    };

    AsyncStorage.getItem('currentUser')
      .then((data) => {
        this.setState({ currentUser: JSON.parse(data) });
      });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Email:</Text>
        <Text>{currentUser.email}</Text>
        <Buttons
          title="Logout"
          type="primary"
          onPress={user.logout}
        />
      </View>
    );
  }
}

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  styles,
  textInputs,
  buttons,
  alertBoxes,
  colors,
} from '../utils/styles';
import user from '../database/User';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      emailErr: false,
      passErr: false,
      btnLoading: false,
      errorMsg: null,
    };
  }

  signup = async () => {
    this.setState({ btnLoading: true });

    const { email, password } = this.state;
    const { navigation } = this.props;
    const response = await user.signup(email, password);

    this.setState({ btnLoading: false });
    if (response.status === 'error') {
      this.setState({ errorMsg: response.message || 'An unknown error occurred.' });
    } else {
      navigation.navigate('App');
    }
  }

  gotoLogin = async () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  renderButton = () => {
    const { btnLoading } = this.state;
    return (
      <View>
        <TouchableHighlight
          style={btnLoading ? buttons.default : buttons.primary}
          onPress={this.signup}
        >
          { btnLoading
            ? <ActivityIndicator size="small" color={colors.darkGrey} />
            : <Text style={buttons.textLight}>Signup</Text>
          }
        </TouchableHighlight>
        <TouchableOpacity
          style={buttons.link}
          onPress={this.gotoLogin}
        >
          <Text style={styles.linkTxt}>Already have an account? Login Here.</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderErrorMsg = () => {
    const { errorMsg } = this.state;
    if (errorMsg) {
      return (
        <View style={alertBoxes.error}>
          <Text style={alertBoxes.alertText}>{errorMsg}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const {
      emailErr, email, password, passErr,
    } = this.state;

    return (
      <View style={[styles.container, { justifyContent: 'flex-start' }]}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={emailErr ? textInputs.error : textInputs.default}
          onChange={({ nativeEvent }) => {
            this.setState({ email: nativeEvent.text });
          }}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={passErr ? textInputs.error : textInputs.default}
          onChange={({ nativeEvent }) => {
            this.setState({ password: nativeEvent.text });
          }}
          value={password}
        />
        {this.renderButton()}
        {this.renderErrorMsg()}
      </View>
    );
  }
}

Signup.propTypes = {
  navigation: PropTypes.object.isRequired,
};

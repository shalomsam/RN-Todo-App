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
  styles, textInputs, buttons, alertBoxes, colors,
} from '../utils/styles';
import user from '../database/User';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   contentWrp: {
//     padding: GlobalStyles.containerPadding,
//   },
// });

export default class Login extends React.Component {
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

  login = async () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.setState({ btnLoading: true });
    const response = await user.login(email, password);
    this.setState({ btnLoading: false });
    if (response.status === 'error') {
      this.setState({ errorMsg: response.message || 'An unknown error occurred.' });
    } else {
      navigation.navigate('App');
    }
  }

  gotoSignup = () => {
    const { navigation } = this.props;
    navigation.navigate('Signup');
  }

  renderButton = () => {
    const { btnLoading } = this.state;
    return (
      <View>
        <TouchableHighlight
          style={btnLoading ? buttons.default : buttons.primary}
          onPress={this.login}
        >
          { btnLoading
            ? <ActivityIndicator size="small" color={colors.darkGrey} />
            : <Text style={buttons.textLight}>Login</Text>
          }
        </TouchableHighlight>
        <TouchableOpacity
          style={buttons.link}
          onPress={this.gotoSignup}
        >
          <Text style={styles.linkTxt}>
            Don&apos;t have an account? Signup Here.
          </Text>
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
      email,
      emailErr,
      password,
      passErr,
    } = this.state;

    return (
      <View style={[styles.container, { justifyContent: 'flex-start' }]}>
        <View>
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
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object,
};

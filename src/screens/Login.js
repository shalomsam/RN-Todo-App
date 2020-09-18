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
import UnSplashBg from '../components/UnSplashBg';
import Container from '../components/Container';
import SocialLogins from '../components/SocialLogins';

const InputStyle = {
    backgroundColor: colors.white,
    opacity: 0.8,
    borderColor: colors.white,
    color: colors.darkGrey,
};

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
        if (response.status === 'error') {
            this.setState({ btnLoading: false });
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
                    style={[btnLoading ? buttons.default : buttons.primary, { marginTop: 120 }]}
                    onPress={this.login}
                >
                    {btnLoading
                        ? <ActivityIndicator size="small" color={colors.darkGrey} />
                        : <Text style={buttons.textLight}>Login</Text>}
                </TouchableHighlight>
                <TouchableOpacity
                    style={buttons.link}
                    onPress={this.gotoSignup}
                >
                    <Text style={[
                        styles.linkTxt,
                        {
                            color: colors.white,
                            fontWeight: 'bold',
                            fontSize: 16,
                            textAlign: 'center',
                        },
                    ]}
                    >
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
            <UnSplashBg
                defaultColor={colors.blue}
                forceNewBackground
            >
                <Container
                    containerStyles={{ justifyContent: 'center' }}
                >
                    <Text
                        style={{
                            fontSize: 70,
                            color: colors.white,
                            textShadowColor: '#000',
                            textShadowOffset: { height: 0, width: 0 },
                            textShadowRadius: 5,
                        }}
                    >
                        Hi
                        {'\n'}
                        There.
                    </Text>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        placeholderTextColor={colors.darkGrey}
                        style={
                            emailErr
                                ? textInputs.error
                                : [
                                    textInputs.default,
                                    InputStyle,
                                ]
                        }
                        onChange={({ nativeEvent }) => this.setState({ email: nativeEvent.text })}
                        value={email}
                    />
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        placeholderTextColor={colors.darkGrey}
                        style={
                            passErr
                                ? textInputs.error
                                : [
                                    textInputs.default,
                                    InputStyle,
                                ]
                        }
                        onChange={({ nativeEvent }) => {
                            this.setState({ password: nativeEvent.text });
                        }}
                        value={password}
                    />
                    {this.renderButton()}
                    <SocialLogins />
                    {this.renderErrorMsg()}
                </Container>
            </UnSplashBg>
        );
    }
}

Login.propTypes = {
    navigation: PropTypes.object,
};

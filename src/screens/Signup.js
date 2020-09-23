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
import UnSplashBg from '../components/UnSplashBg';
import ErrorHandler from '../components/ErrorHandler';
import Container from '../components/Container';
import SocialLogins from '../components/SocialLogins';
import Divider from '../components/Divider';

const InputStyle = {
    backgroundColor: colors.white,
    opacity: 0.8,
    borderColor: colors.white,
    color: colors.darkGrey,
};

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
                    {btnLoading
                        ? <ActivityIndicator size="small" color={colors.darkGrey} />
                        : <Text style={buttons.textLight}>Signup</Text>}
                </TouchableHighlight>
                <TouchableOpacity
                    style={buttons.link}
                    onPress={this.gotoLogin}
                >
                    <Text
                        style={[
                            styles.linkTxt,
                            {
                                color: colors.white,
                                fontWeight: 'bold',
                                fontSize: 16,
                                textAlign: 'center',
                            },
                        ]}
                    >
                        Already have an account? Login Here.
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
            emailErr, email, password, passErr,
        } = this.state;

        return (
            <UnSplashBg
                defaultColor={colors.blue}
                forceNewBackground
            >
                <ErrorHandler>
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
                            Let&apos;s Sign
                            {'\n'}
                            you up.
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
                            onChange={({ nativeEvent }) => {
                                this.setState({ email: nativeEvent.text });
                            }}
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
                        <Divider>OR</Divider>
                        <SocialLogins />
                        {this.renderErrorMsg()}
                    </Container>
                </ErrorHandler>
            </UnSplashBg>
        );
    }
}

Signup.propTypes = {
    navigation: PropTypes.object.isRequired,
};

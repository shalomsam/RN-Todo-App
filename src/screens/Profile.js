import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../utils/styles';
import user from '../database/User';
import Buttons from '../components/UI/Buttons';
import { logger } from '../utils/LogManager';

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

    logout = async () => {
        const { navigation } = this.props;
        try {
            await user.logout();
        } catch (e) {
            logger.error('Profile:logout >> ', e);
        }
        navigation.navigate('Login');
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
                    onPress={this.logout}
                />
            </View>
        );
    }
}


Profile.propTypes = {
    navigation: PropTypes.object.isRequired,
};

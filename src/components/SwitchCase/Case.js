import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

export default class Case extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { children } = this.props;
        return (
            <View>
                {children}
            </View>
        );
    }
}

Case.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

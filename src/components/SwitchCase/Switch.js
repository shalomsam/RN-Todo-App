import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Case from './Case';

export default class Switch extends PureComponent {
    // eslint-disable-next-line react/jsx-props-no-spreading
    static Case = (props) => <Case {...props} />;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { children, route } = this.props;
        return (
            <View>
                {React.Children.map(children, (el) => {
                    if (el.props.match === route) {
                        return React.cloneElement(el);
                    }
                    return null;
                })}
            </View>
        );
    }
}

Switch.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    route: PropTypes.string.isRequired,
};

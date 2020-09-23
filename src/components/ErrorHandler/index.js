import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import SimpleModal from '../Modals/SimpleModal';
import { styles } from '../../utils/styles';

class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }

    render() {
        const { children } = this.props;
        const { error, errorInfo } = this.state;
        return (
            <>
                {children}
                <SimpleModal
                    visible={!!error}
                    title="Error"
                    closeAction={() => {
                        this.setState({ error: null, errorInfo: null });
                    }}
                >
                    <Text style={styles.headerText}>Oops something went wrong!</Text>
                    <Text>{errorInfo}</Text>
                </SimpleModal>
            </>
        );
    }
}

ErrorHandler.propTypes = {
    children: PropTypes.any,
};

export default ErrorHandler;

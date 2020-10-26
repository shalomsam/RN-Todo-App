import * as React from 'react';
import { Platform } from 'react-native';
// import * as Sentry from 'sentry-expo';
import Main from './src/Main';
import enableFontPatch from './src/utils/fontPatch';
import { logger } from './src/utils/LogManager';

if (Platform.OS === 'android') {
    enableFontPatch();
}

logger.init();

export default class App extends React.PureComponent {
    render() {
        return <Main />;
    }
}

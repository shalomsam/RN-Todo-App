import * as React from 'react';
import { View, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import PropTypes from 'prop-types';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from '../../utils/styles';

const AppSplashScreen = ({
    promises = [],
    onComplete = () => {},
    autoProgress = false,
}) => {
    const [progress, setProgress] = React.useState(0);
    const [shouldLoad, setShouldLoad] = React.useState(false);

    React.useEffect(() => {
        let isMounted = true;

        const progressPromise = (promisesArr, callback) => {
            const len = promisesArr.length;
            let _progress = 0;
            const tick = (promise) => {
                promise.then(() => {
                    _progress += 1;
                    callback(_progress, len);
                });

                return promise;
            };

            return Promise.all(promisesArr.map(tick));
        };

        const onLoad = async () => {
            SplashScreen.hideAsync();
            if (autoProgress) {
                let i = 10;
                setTimeout(() => {
                    while (i < 100) {
                        if (isMounted) {
                            setProgress(i += 10);
                        }
                    }
                }, 100);
            } else {
                await progressPromise(promises, (completed, total) => {
                    if (isMounted) {
                        setProgress((completed / total) * 100);
                    }
                });
            }
            onComplete();
        };

        if (shouldLoad) {
            onLoad();
        }

        return () => {
            isMounted = false;
        };
    }, [shouldLoad]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 200, height: 200 }}>
                <Image
                    style={{
                        width: 160, height: 160, marginLeft: 'auto', marginRight: 'auto',
                    }}
                    source={require('../../../assets/icon.png')}
                    onLoad={() => setShouldLoad(true)}
                />
                <ProgressBar
                    style={{ marginTop: 10 }}
                    progress={progress}
                    color={colors.primary}
                />
            </View>
        </View>
    );
};

AppSplashScreen.propTypes = {
    promises: PropTypes.array,
    onComplete: PropTypes.func,
    autoProgress: PropTypes.bool,
};

export default AppSplashScreen;

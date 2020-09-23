import React, { useState, useEffect, useRef } from 'react';
import {
    AsyncStorage, View, Text, ImageBackground,
} from 'react-native';
import Unsplash, { toJson } from 'unsplash-js';
import { Linking } from 'expo';
import PropTypes from 'prop-types';
import { colors, styles, gutter } from '../../utils/styles';

const UnSplashBg = ({
    searchKeyword = 'landscape + dark',
    forceNewBackground = false,
    defaultColor,
    children,
}) => {
    const totalImages = 10;
    const storageKey = 'unsplashImageData';
    const imagesRenewDays = 10;

    const [bgImage, setBgImage] = useState(null);
    const todayTimestamp = (new Date()).getTime();
    const mountedRef = useRef(true);

    const safeSetBgImage = (data) => {
        if (mountedRef.current) {
            setBgImage(data);
        }
    };

    useEffect(() => {
        const setRandomImg = (imageArr) => {
            const randomIndex = Math.round(Math.random() * totalImages);
            safeSetBgImage(imageArr[randomIndex]);
        };

        const getUnsplashImage = async () => {
            const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
            let data = null;
            try {
                const response = await unsplash.search.photos(searchKeyword, 1, 10, {
                    orientation: 'portrait',
                    contentFilter: 'high',
                });
                data = toJson(response);
            } catch (e) {
                return null;
            }

            return data;
        };

        if (!bgImage) {
            AsyncStorage.getItem(storageKey)
                .then((data) => {
                    const shouldRenew = (todayTimestamp > data?.renewDate) && !forceNewBackground;
                    if (data && data.images.length && !shouldRenew) {
                        safeSetBgImage(data.images);
                        return;
                    }

                    getUnsplashImage()
                        .then((json) => {
                        // console.log("json.results >>", json.results);
                            setRandomImg(json.results);

                            if (json?.results?.length) {
                                return;
                            }

                            let storageData = { images: json.results };
                            const dt = new Date();
                            dt.setDate(dt.getDate() + imagesRenewDays);
                            const renewTimestamp = dt.getTime();

                            storageData = {
                                ...storageData,
                                created: todayTimestamp,
                                renewDate: renewTimestamp,
                            };

                            AsyncStorage.setItem(storageKey, storageData)
                                .catch((e) => console.error(e));
                        })
                        .catch((e) => console.error('getUnsplashImage >> err >> ', e));
                });
        }

        return () => {
            mountedRef.current = false;
        };
    });

    const userLink = `${bgImage?.user?.links?.html || ''}?utm_source=Organiizr&utm_medium=referral`;

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: defaultColor,
                flexDirection: 'column',
            }}
        >
            <ImageBackground
                source={{ uri: bgImage && bgImage?.urls?.regular }}
                style={{
                    flex: 1,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                }}
            >
                {children}
                <View
                    style={{
                        position: 'absolute',
                        bottom: gutter - 10,
                        right: gutter,
                    }}
                >
                    {bgImage?.user?.name && (
                        <Text style={{ color: colors.white }}>
                            Photo by
                            {' '}
                            <Text
                                style={[styles.linkTxt, { color: colors.white }]}
                                onPress={() => Linking.openURL(userLink)}
                            >
                                {bgImage.user.name}
                            </Text>
                            {' '}
                            on
                            {' '}
                            <Text
                                style={[styles.linkTxt, { color: colors.white }]}
                                onPress={() => Linking.openURL('https://unsplash.com/?utm_source=Organiizr&utm_medium=referral')}
                            >
                                Unsplash
                            </Text>
                        </Text>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
};

UnSplashBg.propTypes = {
    searchKeyword: PropTypes.string,
    forceNewBackground: PropTypes.bool,
    defaultColor: PropTypes.string,
    children: PropTypes.any,
};

export default UnSplashBg;

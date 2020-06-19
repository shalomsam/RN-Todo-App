import React from 'react';
import { Platform, Text } from 'react-native';

export function enableFontPatch() {

	const defaultFontFamily = {
		...Platform.select({
			android: { fontFamily: 'Roboto' }
		})
	};

	const oldRender = Text.render;
	Text.render = function(...args) {
		const origin = oldRender.call(this, ...args);
		return React.cloneElement(origin, {
			style: [defaultFontFamily, origin.props.style]
		});
	};
}
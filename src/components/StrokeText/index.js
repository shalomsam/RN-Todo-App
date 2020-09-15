import React from "react";
import { StyleSheet, View } from "react-native";
import { Children, cloneElement, isValidElement } from "react";

const styles = StyleSheet.create({
    outline: {
        position: 'absolute'
    },
});

export class StrokeText extends React.Component {
    createClones = (w, h, color = "") => {
        const { children } = this.props;
        return Children.map(children, child => {
            if (isValidElement(child)) {
                const currentProps = child.props;
                const currentStyle = currentProps ? (currentProps.style || {}) : {};

                const newProps = {
                    ...currentProps,
                    style: {
                        ...currentStyle,
                        textShadowOffset: {
                            width: w,
                            height: h
                        },
                        textShadowColor: color,
                        textShadowRadius: 1
                    }
                }
                return cloneElement(child, newProps)
            }
            return child;
        });
    }

    render() {
        const { color, stroke, numberOfClones = 3, children } = this.props;
        const strokeW = stroke;
        const top = this.createClones(0, -strokeW * 1.2, color);
        const topLeft = this.createClones(-strokeW, -strokeW, color);
        const topRight = this.createClones(strokeW, -strokeW, color);
        const right = this.createClones(strokeW, 0, color);
        const bottom = this.createClones(0, strokeW, color);
        const bottomLeft = this.createClones(-strokeW, strokeW, color);
        const bottomRight = this.createClones(strokeW, strokeW, color);
        const left = this.createClones(-strokeW * 1.2, 0, color);

        return (
            <View>
                {/* {numberOfClones > 3 && (
                    <>
                        <View style={styles.outline}>{left}</View>
                        <View style={styles.outline}>{right}</View>
                        <View style={styles.outline}>{bottom}</View>
                        <View style={styles.outline}>{top}</View>
                    </>
                )} */}
                <View style={styles.outline}>{topLeft}</View>
                <View style={styles.outline}>{topRight}</View>
                <View style={styles.outline}>{bottomLeft}</View>
                {bottomRight}
            </View>
        );
    }
}

export default StrokeText;
import { StyleSheet, Platform } from 'react-native';

export const colors = {
    white: '#ffffff',
    blue: '#2980b9',
    lightGrey: '#e2e6ea',
    darkGrey: '#212529',
    success: '#2ecc71',
    error: '#e74c3c',
    warning: '#f39c12',
    btnBg: '#dae0e5',
    primary: '#4776E6',
    secondary: '#8E54E9',
    tertiary: '#2ecc71',
    tertiaryAlt: '#27ae60',
};

export const fontSize = 18;
export const iconSize = 22;
export const btnTxtSize = 18;
export const fontColorLight = colors.white;
export const fontColorDark = colors.darkGrey;
export const gutter = 20;
export const borderRadius = 5;
export const headerHeight = 60;

export const btnDefault = {
    position: 'relative',
    width: '100%',
    padding: gutter,
    paddingTop: gutter,
    paddingBottom: gutter,
    marginTop: gutter,
    marginBottom: gutter,
    borderRadius,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.btnBg,
};

export const textInputLight = {
    fontSize,
    color: fontColorDark,
    borderBottomWidth: 1,
    borderColor: colors.primary,
    padding: gutter,
    marginTop: gutter - 5,
    marginBottom: gutter - 5,
};

export const styles = {
    iconSize,
    appBackgroundColors: [colors.primary, colors.secondary],
    statusBarHeight: Platform.OS === 'ios' ? 20 : 0,

    container: {
        flex: 1,
        padding: gutter,
        // justifyContent: 'center',
        alignContent: 'center',
    },

    linkTxt: {
        textDecorationLine: 'underline',
        color: colors.blue,
    },

    header: {
        position: 'relative',
        height: headerHeight,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    headerText: {
        fontSize,
        color: colors.white,
        fontWeight: '800',
        textAlign: 'center',
    },

    headerIconLeft: {
        position: 'absolute',
        left: 10,
        zIndex: 10,
    },

    headerIconRight: {
        position: 'absolute',
        right: 10,
        zIndex: 10,
    },

    btnTxtDefault: {
        fontSize: btnTxtSize,
        color: fontColorLight,
        textAlign: 'center',
    },

    alertBoxDefault: {
        padding: gutter,
        marginTop: gutter,
        marginBottom: gutter,
        backgroundColor: colors.warning,
        borderWidth: 1,
        borderColor: colors.warning,
        borderRadius,
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        shadowOffset: { height: 2, width: 0 },
        shadowColor: '#000000',
        shadowOpacity: 0.6,
        elevation: 5,
        position: 'relative',
    },

    modalBackdrop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalStyle: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        color: '#333',
        elevation: 5,
        shadowOffset: { height: 4, width: 0 },
        shadowColor: '#000000',
        shadowOpacity: 0.6,
        width: '90%',
        height: 'auto',
    },
    modalTitle: {
        fontSize,
        fontWeight: 'bold',
        color: '#333',
    },
};

export const bold = { fontWeight: 'bold', color: fontColorDark };
export const typography = StyleSheet.create({
    h1: {
        ...bold,
        fontSize: 32,
    },
    h2: {
        ...bold,
        fontSize: 26,
    },
    h3: {
        ...bold,
        fontSize: 22,
    },
    h4: {
        ...bold,
        fontSize: 18,
    },
    h5: {
        ...bold,
        fontSize: 16,
    },
    h6: {
        ...bold,
        fontSize: 12,
    },
    para: {
        fontSize,
        fontWeight: 'normal',
    },
    italic: {
        fontSize,
        fontStyle: 'italic',
    },
});

export const buttons = StyleSheet.create({
    default: {
        ...btnDefault,
    },
    primary: {
        ...btnDefault,
        ...{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
    },
    secondary: {
        ...btnDefault,
        ...{
            backgroundColor: colors.secondary,
            borderColor: colors.secondary,
        },
    },
    tertiary: {
        ...btnDefault,
        backgroundColor: colors.tertiary,
        borderColor: colors.tertiary,
        borderBottomColor: colors.tertiaryAlt,
        borderBottomWidth: 5,
    },
    link: {
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    textLink: {
        ...styles.btnTxtDefault,
        color: colors.blue,
        textDecorationLine: 'underline',
    },
    textLight: {
        ...styles.btnTxtDefault,
    },
    textDark: {
        ...styles.btnTxtDefault,
        fontSize: btnTxtSize,
        color: fontColorDark,
    },
});

export const textInputs = StyleSheet.create({
    default: {
        ...textInputLight,
    },
    error: {
        ...textInputLight,
        color: colors.error,
        borderColor: colors.error,
    },
});

export const alertBoxes = StyleSheet.create({
    default: {
        ...styles.alertBoxDefault,
    },
    error: {
        ...styles.alertBoxDefault,
        backgroundColor: colors.error,
        borderColor: colors.error,
    },
    info: {
        ...styles.alertBoxDefault,
        backgroundColor: colors.blue,
        borderColor: colors.blue,
    },
    alertText: {
        fontSize: 14,
        color: colors.white,
    },
});

"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const TouchableDebounce_1 = require("../../components/TouchableDebounce");
const theme_1 = require("../../constants/theme");
const UserActions = __importStar(require("../../store/user/actions"));
class HomeScreen extends react_1.Component {
    render() {
        const { UserActions, fontSizeForDisplay } = this.props;
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.Text, { style: [styles.welcome, { fontSize: fontSizeForDisplay }] }, "Welcome to React Native!"),
            react_1.default.createElement(react_native_1.Text, { style: { fontSize: 20, marginBottom: 20 } }, "Select fontSize for Text:"),
            react_1.default.createElement(react_native_1.View, null,
                react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => { UserActions.changeFontSize(10); }, style: styles.button },
                    react_1.default.createElement(react_native_1.Text, { style: [styles.textButton, { fontSize: 12 }] }, "SMALL")),
                react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => { UserActions.changeFontSize(14); }, style: styles.button },
                    react_1.default.createElement(react_native_1.Text, { style: [styles.textButton, { fontSize: 14 }] }, "STANDARD")),
                react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => { UserActions.changeFontSize(18); }, style: styles.button },
                    react_1.default.createElement(react_native_1.Text, { style: [styles.textButton, { fontSize: 16 }] }, "LARGE")))));
    }
}
const mapStateToProps = (state) => ({
    fontSizeForDisplay: state.User.fontSizeForDisplay,
});
const mapDispatchToProps = (dispatch) => ({
    UserActions: redux_1.bindActionCreators(UserActions, dispatch),
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
const styles = react_native_1.StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: theme_1.colors.main,
        borderRadius: 5,
        height: 50,
        margin: 5,
        width: 200,
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    textButton: {
        color: 'white'
    },
    welcome: {
        margin: 10,
        textAlign: 'center',
    },
});

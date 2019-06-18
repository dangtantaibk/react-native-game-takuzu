"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const ScreenAreaView_1 = __importDefault(require("../../../components/ScreenAreaView"));
const TouchableDebounce_1 = require("../../../components/TouchableDebounce");
const theme_1 = require("../../../constants/theme");
class Popup extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { title, isDontSaveButton } = this.props;
        return (React.createElement(react_native_1.Modal, { animationType: "fade", transparent: true, visible: this.props.modalVisible, onRequestClose: () => { this.props.onClose(); } },
            React.createElement(react_native_1.View, { style: styles.modal },
                React.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => { this.props.onClose(); }, style: { flex: 1 } }),
                React.createElement(ScreenAreaView_1.default, { forceInset: { bottom: 'always' }, style: [styles.modalSelectBox, { height: isDontSaveButton ? 400 : 300 }] },
                    React.createElement(react_native_1.View, { style: { flex: 1 } },
                        React.createElement(react_native_1.Text, { style: styles.title }, 'Cảnh báo'),
                        React.createElement(react_native_1.Text, { style: styles.textTitle }, title)),
                    React.createElement(react_native_1.View, null,
                        React.createElement(react_native_1.TouchableOpacity, { style: styles.buttonDone, onPress: () => this.props.onPressButtonYes() },
                            React.createElement(react_native_1.Text, { style: styles.textButton }, 'Đồng ý')),
                        isDontSaveButton ?
                            React.createElement(react_native_1.TouchableOpacity, { style: styles.buttonDontSave, onPress: () => this.props.onDontSave && this.props.onDontSave() },
                                React.createElement(react_native_1.Text, { style: styles.textButton }, 'Thoát nhưng không lưu'))
                            : null,
                        React.createElement(react_native_1.TouchableOpacity, { style: styles.buttonCancel, onPress: () => this.props.onClose() },
                            React.createElement(react_native_1.Text, { style: [styles.textButton, { color: '#000' }] }, 'Trở lại')))))));
    }
}
exports.default = Popup;
const styles = react_native_1.StyleSheet.create({
    buttonCancel: {
        alignItems: 'center',
        backgroundColor: theme_1.colors.background,
        borderRadius: 6,
        height: 50,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 10
    },
    buttonDone: {
        alignItems: 'center',
        backgroundColor: '#D14242',
        borderRadius: 6,
        height: 50,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 50
    },
    buttonDontSave: {
        alignItems: 'center',
        backgroundColor: theme_1.colors.main,
        borderRadius: 6,
        height: 50,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 10
    },
    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalSelectBox: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderTopLeftRadius: 34,
        borderTopRightRadius: 34,
        flex: 0,
        height: 300,
    },
    textButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    textTitle: {
        color: '#000000',
        fontSize: 16,
        lineHeight: 26,
        marginHorizontal: 80,
        marginTop: 34,
        textAlign: 'center',
    },
    title: {
        color: '#D14242',
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 26,
        marginHorizontal: 80,
        marginTop: 34,
        textAlign: 'center',
    },
});

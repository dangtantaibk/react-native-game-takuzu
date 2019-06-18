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
                        React.createElement(react_native_1.Text, { style: { color: '#D14242', lineHeight: 26, fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 34, marginHorizontal: 80 } }, 'Cảnh báo'),
                        React.createElement(react_native_1.Text, { style: { color: '#000000', lineHeight: 26, fontSize: 16, textAlign: 'center', marginTop: 34, marginHorizontal: 80 } }, title)),
                    React.createElement(react_native_1.View, null,
                        React.createElement(react_native_1.TouchableOpacity, { style: { backgroundColor: '#D14242', borderRadius: 6, justifyContent: 'center', alignItems: 'center', height: 50, marginHorizontal: 10, marginTop: 50 }, onPress: () => this.props.onPressButtonYes() },
                            React.createElement(react_native_1.Text, { style: { color: '#ffffff', lineHeight: 24, fontSize: 16, fontWeight: 'bold' } }, 'Đồng ý')),
                        isDontSaveButton &&
                            React.createElement(react_native_1.TouchableOpacity, { style: { backgroundColor: theme_1.colors.main, borderRadius: 6, justifyContent: 'center', alignItems: 'center', height: 50, marginHorizontal: 10, marginTop: 10 }, onPress: () => this.props.onDontSave && this.props.onDontSave() },
                                React.createElement(react_native_1.Text, { style: { color: '#ffffff', lineHeight: 24, fontSize: 16, fontWeight: 'bold' } }, 'Thoát nhưng không lưu')),
                        React.createElement(react_native_1.TouchableOpacity, { style: { backgroundColor: theme_1.colors.background, borderRadius: 6, justifyContent: 'center', alignItems: 'center', height: 50, marginHorizontal: 10, marginTop: 10 }, onPress: () => this.props.onClose() },
                            React.createElement(react_native_1.Text, { style: { color: '#000', lineHeight: 24, fontSize: 16, fontWeight: 'bold' } }, 'Trở lại')))))));
    }
}
exports.default = Popup;
const styles = react_native_1.StyleSheet.create({
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
});

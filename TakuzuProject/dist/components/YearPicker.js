"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const react_native_1 = require("react-native");
class YearPicker extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: parseInt(props.year, 0),
        };
    }
    render() {
        const yearList = [];
        for (let i = 1900; i < 2100; i++) {
            yearList.push(i);
        }
        return (React.createElement(react_native_1.Modal, { animationType: "fade", transparent: true, visible: this.props.modalVisible || false, onRequestClose: () => { this.props.onClose(); } },
            React.createElement(react_native_1.View, { style: styles.modal },
                React.createElement(react_native_1.View, { style: styles.modalSelectBox },
                    React.createElement(react_native_1.View, { style: styles.modalSelectBoxHeader },
                        React.createElement(react_native_1.TouchableOpacity, { onPress: () => { this.props.onClose(); }, style: styles.modalSelectBoxHeaderButton },
                            React.createElement(react_native_1.Text, { style: styles.modalSelectBoxHeaderButtonText }, "Done"))),
                    React.createElement(react_native_1.View, { style: styles.modalSelectBoxBody },
                        React.createElement(react_native_1.View, { style: {
                                alignItems: 'baseline',
                                backgroundColor: '#FFFFFF',
                                flexDirection: 'row',
                                paddingHorizontal: 0
                            } },
                            React.createElement(react_native_1.Picker, { selectedValue: this.state.year, style: { flex: 1 }, onValueChange: (itemValue) => this.setState({ year: parseInt(itemValue, 0) }, () => {
                                    if (this.props.onYearChange) {
                                        this.props.onYearChange(this.state.year);
                                    }
                                }) }, yearList.map((item, index) => {
                                return React.createElement(react_native_1.Picker.Item, { key: index, label: item.toString(), value: item });
                            }))))))));
    }
}
exports.YearPicker = YearPicker;
const styles = react_native_1.StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(77, 92, 116, 0.85)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalSelectBox: {
        alignSelf: 'stretch',
        backgroundColor: '#FFFFFF',
        maxHeight: 300,
    },
    modalSelectBoxBody: {
        height: 200
    },
    modalSelectBoxHeader: {
        alignItems: 'flex-end',
        backgroundColor: '#F0F5F6',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    modalSelectBoxHeaderButton: {
        backgroundColor: 'transparent'
    },
    modalSelectBoxHeaderButtonText: {
        backgroundColor: 'transparent',
        color: '#00528F',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

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
class HoursPicker extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            hour: props.hour || 0,
            minute: props.minute || 0,
        };
    }
    render() {
        const lstHours = [];
        const lstMinutes = [];
        for (let i = 0; i < 60; i++) {
            lstMinutes.push(i);
        }
        for (let i = 0; i < 24; i++) {
            lstHours.push(i);
        }
        return (React.createElement(react_native_1.Modal, { animationType: "fade", transparent: true, visible: this.props.modalVisible, onRequestClose: () => { this.props.onClose(); } },
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
                            React.createElement(react_native_1.Picker, { selectedValue: this.state.hour, style: { flex: 1 }, onValueChange: (itemValue) => this.setState({ hour: parseInt(itemValue, 0) }, () => {
                                    if (this.props.onHourChange) {
                                        this.props.onHourChange(this.state.hour, this.state.minute);
                                    }
                                }) }, lstHours.map((item, index) => {
                                return (React.createElement(react_native_1.Picker.Item, { key: index, label: item.toString().length === 1 ? `0${item.toString()}` : item.toString(), value: item }));
                            })),
                            React.createElement(react_native_1.Picker, { style: { flex: 1 } },
                                React.createElement(react_native_1.Picker.Item, { label: ':' })),
                            React.createElement(react_native_1.Picker, { selectedValue: this.state.minute, style: { flex: 1 }, onValueChange: (itemValue) => this.setState({ minute: parseInt(itemValue, 0) }, () => {
                                    if (this.props.onHourChange) {
                                        this.props.onHourChange(this.state.hour, this.state.minute);
                                    }
                                }) }, lstMinutes.map((item, index) => {
                                return (React.createElement(react_native_1.Picker.Item, { key: index, label: item.toString().length === 1 ? `0${item.toString()}` : item.toString(), value: item }));
                            }))))))));
    }
}
exports.HoursPicker = HoursPicker;
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

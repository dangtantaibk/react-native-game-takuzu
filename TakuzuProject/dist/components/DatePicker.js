"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const React = __importStar(require("react"));
const react_1 = require("react");
const react_native_1 = require("react-native");
class DatePicker extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: 1,
            month: 1,
            valueMonthPicker: '',
            year: 1,
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let dateMili;
            if (this.props.date) {
                const [day, month, year] = this.props.date.split("/");
                dateMili = new Date(parseInt(year, 0), parseInt(month, 0) - 1, parseInt(day, 0));
            }
            else {
                dateMili = new Date();
            }
            yield this.setState({
                date: dateMili.getDate(),
                month: dateMili.getMonth(),
                year: dateMili.getFullYear(),
            });
        });
    }
    checkIsNaNDate() {
        const monthStr = '0' + this.state.month;
        const dayStr = '0' + this.state.date;
        const birthday = new Date(this.state.year + '-' + monthStr.slice(-2) + '-' + dayStr.slice(-2));
        let birthdayNew = new Date();
        if (isNaN(birthday.getTime())) {
            this.setState({ date: 1 });
            const monthStr1 = '0' + this.state.month;
            const dayStr1 = '0' + 1;
            birthdayNew = new Date(this.state.year + '-' + monthStr1.slice(-2) + '-' + dayStr1.slice(-2));
            return birthdayNew;
        }
        return birthday;
    }
    render() {
        const monthList = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const dayList = [];
        const yearList = [];
        for (let i = 1; i < 32; i++) {
            dayList.push(i);
        }
        for (let i = 1900; i < 2100; i++) {
            yearList.push(i);
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
                            React.createElement(react_native_1.Picker, { selectedValue: this.state.date, style: { flex: 1 }, onValueChange: (itemValue) => this.setState({ date: parseInt(itemValue, 0) }, () => {
                                    const birthday = this.checkIsNaNDate();
                                    this.props.onDateChange(moment_1.default(birthday).format("DD/MM/YYYY"));
                                }) }, dayList.map((item, index) => {
                                return React.createElement(react_native_1.Picker.Item, { key: index, label: item.toString(), value: item });
                            })),
                            React.createElement(react_native_1.Picker, { selectedValue: this.state.valueMonthPicker === '' ?
                                    monthList[this.state.month] : this.state.valueMonthPicker, style: { flex: 1 }, onValueChange: (itemValue, itemIndex) => {
                                    console.log('milliseconds', itemValue);
                                    this.setState({
                                        month: itemIndex + 1,
                                        valueMonthPicker: monthList[itemIndex]
                                    }, () => {
                                        const birthday = this.checkIsNaNDate();
                                        this.props.onDateChange(moment_1.default(birthday).format("DD/MM/YYYY"));
                                    });
                                } }, monthList.map((item, index) => {
                                return React.createElement(react_native_1.Picker.Item, { key: index, label: item.toString(), value: item });
                            })),
                            React.createElement(react_native_1.Picker, { selectedValue: this.state.year, style: { flex: 1 }, onValueChange: (itemValue) => this.setState({ year: parseInt(itemValue, 0) }, () => {
                                    const birthday = this.checkIsNaNDate();
                                    this.props.onDateChange(moment_1.default(birthday).format("DD/MM/YYYY"));
                                }) }, yearList.map((item, index) => {
                                return React.createElement(react_native_1.Picker.Item, { key: index, label: item.toString(), value: item });
                            }))))))));
    }
}
exports.DatePicker = DatePicker;
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

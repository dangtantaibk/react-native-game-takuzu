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
class TextChangeFontSize extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let fontSize;
        let lineHeight;
        switch (this.props.fontSizeForDisplay) {
            case "SMALL":
                fontSize = 12;
                lineHeight = 20;
                break;
            case "STANDARD":
                fontSize = 14;
                lineHeight = 22;
                break;
            case "LARGE":
                fontSize = 16;
                lineHeight = 24;
                break;
            default:
                fontSize = 14;
                lineHeight = 22;
                break;
        }
        return (react_1.default.createElement(react_native_1.Text, Object.assign({ style: { fontSize, lineHeight } }, this.props), this.props.children));
    }
}
const mapStateToProps = (state) => ({
    fontSizeForDisplay: state.User.fontSizeForDisplay,
});
exports.default = react_redux_1.connect(mapStateToProps, null)(TextChangeFontSize);

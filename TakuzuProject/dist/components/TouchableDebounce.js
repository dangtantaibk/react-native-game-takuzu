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
class TouchableDebounce extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.keepDelay = true;
        this.defaultInterval = 500;
        this.debounce = this.debounce.bind(this);
    }
    debounce(event) {
        if (this.props.onPress) {
            if (this.keepDelay) {
                this.keepDelay = false;
                this.props.onPress(event);
                setTimeout(() => {
                    this.keepDelay = true;
                }, this.props.interval || this.defaultInterval);
            }
        }
    }
    render() {
        return (React.createElement(react_native_1.TouchableOpacity, Object.assign({}, this.props, { onPress: this.debounce }), this.props.loading ?
            React.createElement(react_native_1.ActivityIndicator, Object.assign({}, this.props.loadingProps)) :
            this.props.children));
    }
}
TouchableDebounce.defaultProps = {
    loading: false
};
exports.TouchableDebounce = TouchableDebounce;

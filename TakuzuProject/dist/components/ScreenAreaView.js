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
const react_navigation_1 = require("react-navigation");
const styles = react_native_1.StyleSheet.create({
    screen: {
        flex: 1
    }
});
class ScreenAreaView extends react_1.Component {
    constructor(props) {
        super(props);
        this.didFocusSubscription = undefined;
    }
    componentDidMount() {
        react_native_1.StatusBar.setBarStyle(this.props.barStyle || "default", true);
        if (react_native_1.Platform.OS === "android") {
            react_native_1.StatusBar.setBackgroundColor("transparent");
            react_native_1.StatusBar.setTranslucent(true);
        }
        this.didFocusSubscription = this.props.navigation.addListener("didFocus", () => {
            react_native_1.StatusBar.setBarStyle(this.props.barStyle || "default", true);
        });
    }
    componentWillUnmount() {
        if (this.didFocusSubscription) {
            this.didFocusSubscription.remove();
        }
    }
    render() {
        return (react_1.default.createElement(react_navigation_1.SafeAreaView, { forceInset: this.props.forceInset, style: [styles.screen, this.props.style] },
            react_1.default.createElement(react_native_1.StatusBar, { animated: true }),
            this.props.children));
    }
}
exports.default = react_navigation_1.withNavigation(ScreenAreaView);

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
const images_1 = require("../../assets/images");
const TouchableDebounce_1 = require("../../components/TouchableDebounce");
const theme_1 = require("../../constants/theme");
class HomeScreen extends react_1.Component {
    constructor(props) {
        super(props);
        this.onNavigate = (nameScreen) => {
            this.props.navigation.navigate(nameScreen);
        };
        this.onNavigate = this.onNavigate.bind(this);
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => this.onNavigate('PlayScreen'), style: styles.blockPlay },
                react_1.default.createElement(react_native_1.Image, { source: images_1.icons.Play })),
            react_1.default.createElement(TouchableDebounce_1.TouchableDebounce, { onPress: () => this.onNavigate('RankScreen'), style: styles.blockRanking },
                react_1.default.createElement(react_native_1.Image, { source: images_1.icons.ranking, style: { tintColor: theme_1.colors.main } }))));
    }
}
exports.default = HomeScreen;
const styles = react_native_1.StyleSheet.create({
    blockPlay: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    blockRanking: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        backgroundColor: theme_1.colors.background,
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

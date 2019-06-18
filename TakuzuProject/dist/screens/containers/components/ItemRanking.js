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
const theme_1 = require("../../../constants/theme");
const styles = react_native_1.StyleSheet.create({
    bodyCard: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    bodyCardContentText: {
        color: '#9B9B9B',
        fontFamily: theme_1.fontFamily,
        fontSize: 18,
        fontWeight: "600",
        left: 60,
        lineHeight: 27,
        position: 'absolute',
        textAlign: 'center',
    },
    content: {
        color: "#232323",
        fontFamily: theme_1.fontFamily,
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 22,
        marginTop: 5
    },
    headerLeftBtn: {
        alignItems: 'center',
        height: 18,
        justifyContent: 'center',
        left: 15,
        position: 'absolute',
        width: 18,
        zIndex: 3,
    },
    headerRightBtn: {
        alignItems: 'center',
        height: 18,
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        width: 18,
        zIndex: 3,
    },
    icon: {
        height: 18,
        width: 18
    },
});
class ItemRanking extends react_1.Component {
    render() {
        return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: this.props.onPress, style: { paddingVertical: 20 } },
            react_1.default.createElement(react_native_1.View, { style: styles.bodyCard },
                react_1.default.createElement(react_native_1.View, { style: styles.headerLeftBtn },
                    react_1.default.createElement(react_native_1.Image, { style: { tintColor: '#9B9B9B', width: 30, height: 30 }, source: this.props.icon, resizeMode: "contain" })),
                react_1.default.createElement(react_native_1.Text, { style: styles.bodyCardContentText }, this.props.title))));
    }
}
exports.default = ItemRanking;

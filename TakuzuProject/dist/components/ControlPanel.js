"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_1 = __importStar(require("react"));
class ControlPanel extends react_1.Component {
    render() {
        let { closeDrawer, navigate } = this.props;
        return (react_1.default.createElement(react_native_1.ScrollView, { style: styles.container },
            react_1.default.createElement(react_native_1.Text, { style: styles.controlText }, "Phong Thu\u1EF7"),
            react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: () => {
                    navigate ? navigate("LabanScreen") : null;
                    closeDrawer ? closeDrawer() : null;
                } },
                react_1.default.createElement(react_native_1.Text, null, "La b\u00E0n")),
            react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: () => {
                    navigate ? navigate("CuuCungPhiTinh") : null;
                    closeDrawer ? closeDrawer() : null;
                } },
                react_1.default.createElement(react_native_1.Text, null, "Cuu Cung Phi Tinh"))));
    }
}
exports.default = ControlPanel;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    controlText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: 23,
        marginVertical: 30
    },
    button: {
        padding: 10,
    }
});

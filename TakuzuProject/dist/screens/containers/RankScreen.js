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
class RankScreen extends react_1.Component {
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: styles.container }));
    }
}
const mapStateToProps = (state) => ({
    matrix: state.User.matrix,
});
exports.default = react_redux_1.connect(mapStateToProps, null)(RankScreen);
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    instructions: {
        color: '#333333',
        marginBottom: 5,
        textAlign: 'center',
    },
    welcome: {
        margin: 10,
        textAlign: 'center',
    },
});

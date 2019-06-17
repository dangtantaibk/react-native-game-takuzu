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
class Draggable extends react_1.Component {
    constructor() {
        super();
        this.state = {
            pan: new react_native_1.Animated.ValueXY()
        };
    }
    componentWillMount() {
        const { pan } = this.state;
        this._val = { x: 0, y: 0 };
        this.state.pan.addListener((value) => this._val = value);
        this.panResponder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: react_native_1.Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
        });
    }
    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        };
        return (react_1.default.createElement(react_native_1.Animated.View, Object.assign({}, this.panResponder.panHandlers, { style: [panStyle, styles.circle] })));
    }
}
exports.default = Draggable;
let CIRCLE_RADIUS = 30;
let styles = react_native_1.StyleSheet.create({
    circle: {
        backgroundColor: "skyblue",
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS
    }
});

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
const images_1 = require("../assets/images");
const ALIGN_STYLE = {
    center: "center",
    left: "flex-start",
    right: "flex-end"
};
const Children = (props) => (react_1.default.createElement(react_native_1.View, { style: [
        {
            alignItems: props.placement && ALIGN_STYLE[props.placement]
        },
        props.style
    ] }, props.children));
const Container = (props) => {
    if (props.backgroundSource) {
        return (react_1.default.createElement(react_native_1.ImageBackground, { style: { paddingHorizontal: 1 }, source: props.backgroundSource },
            react_1.default.createElement(react_navigation_1.SafeAreaView, Object.assign({}, props), props.children)));
    }
    return react_1.default.createElement(react_navigation_1.SafeAreaView, Object.assign({}, props), props.children);
};
const ArrowBackLeft = (props) => {
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: props.goBackPressed, style: [styles.arrowBackLeft, props.style] },
        react_1.default.createElement(react_native_1.Image, { style: { tintColor: props.tintColor }, source: images_1.icons.backLeftArrow })));
};
class Header extends react_1.PureComponent {
    render() {
        const { backgroundSource, forceInset, backgroundColor, containerStyle, containerBodyStyle, placement, leftContainerStyle, centerContainerStyle, rightContainerStyle, leftComponent, centerComponent, rightComponent, children, bottomComponent, bottomContainerStyle } = this.props;
        const childrens = children;
        return (react_1.default.createElement(Container, { backgroundSource: backgroundSource, forceInset: forceInset, style: react_native_1.StyleSheet.flatten([
                styles.container,
                containerStyle,
                backgroundColor ? { backgroundColor } : null
            ]) },
            react_1.default.createElement(react_native_1.View, { style: react_native_1.StyleSheet.flatten([styles.containerBody, containerBodyStyle]) },
                react_1.default.createElement(Children, { style: [
                        placement === "center" ? styles.rightLeftContainer : {},
                        leftContainerStyle
                    ], placement: "left" }, (react_1.default.isValidElement(children) && children) ||
                    (childrens && childrens[0]) ||
                    leftComponent === 'goBack' ? react_1.default.createElement(ArrowBackLeft, { tintColor: this.props.arrowBackColor, style: this.props.arrowBackStyle, goBackPressed: this.props.goBackPressed }) : leftComponent),
                react_1.default.createElement(Children, { style: [
                        styles.centerContainer,
                        placement !== "center" && {
                            paddingHorizontal: react_native_1.Platform.OS === "ios" ? 15 : 16
                        },
                        centerContainerStyle
                    ], placement: placement }, (react_1.default.isValidElement(children) && children) ||
                    (childrens && childrens[1]) ||
                    centerComponent),
                react_1.default.createElement(Children, { style: [
                        placement === "center" ? styles.rightLeftContainer : {},
                        rightContainerStyle
                    ], placement: "right" }, (react_1.default.isValidElement(children) && children) ||
                    (childrens && childrens[2]) ||
                    rightComponent)),
            react_1.default.createElement(Children, { style: [bottomContainerStyle] }, (react_1.default.isValidElement(children) && children) ||
                (childrens && childrens[3]) ||
                bottomComponent)));
    }
}
Header.defaultProps = {
    placement: "center"
};
exports.default = Header;
const styles = react_native_1.StyleSheet.create({
    arrowBackLeft: {
        padding: 15
    },
    centerContainer: {
        flex: 3
    },
    container: {},
    containerBody: {
        alignItems: "center",
        flexDirection: "row",
        height: react_native_1.Platform.OS === "ios" ? 72 : react_native_1.StatusBar.currentHeight ? react_native_1.StatusBar.currentHeight + 56 : 56,
        justifyContent: "space-between",
        paddingBottom: react_native_1.Platform.OS === 'ios' ? 0 : react_native_1.StatusBar.currentHeight,
        paddingHorizontal: react_native_1.Platform.OS === 'ios' ? 10 : 5,
        paddingTop: react_native_1.Platform.OS === 'ios' ? 0 : react_native_1.StatusBar.currentHeight,
    },
    rightLeftContainer: {
        flex: 1
    }
});

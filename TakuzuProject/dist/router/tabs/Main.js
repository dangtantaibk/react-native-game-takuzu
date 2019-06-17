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
const react_native_1 = require("react-native");
const react_native_animatable_1 = require("react-native-animatable");
const react_navigation_1 = require("react-navigation");
const images_1 = require("../../assets/images");
const theme_1 = require("../../constants/theme");
const screens_1 = require("../../screens");
const AnimationImage = (props) => (React.createElement(react_native_1.View, { style: { alignItems: 'center' } },
    React.createElement(react_native_animatable_1.Image, { animation: props.focused ? "pulse" : undefined, source: props.icon, resizeMode: "contain", style: [styles.icon, { tintColor: props.tintColor || "" }] }),
    React.createElement(react_native_1.Text, { style: {
            color: props.focused ? '#000000' : props.tintColor || undefined,
            fontSize: 10,
            marginTop: 8,
        } }, props.title)));
exports.Main = react_navigation_1.createBottomTabNavigator({
    AccountScreenTab: {
        screen: screens_1.AccountScreen
    },
    HomeScreenTab: {
        screen: screens_1.HomeScreen
    },
    SettingScreenTab: {
        screen: screens_1.SettingScreen
    },
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;
            switch (routeName) {
                case "AccountScreenTab":
                    return (React.createElement(AnimationImage, { focused: navigation.isFocused(), icon: images_1.icons.calendarOutline, tintColor: tintColor, title: 'Account' }));
                case "HomeScreenTab":
                    return (React.createElement(AnimationImage, { focused: navigation.isFocused(), icon: images_1.icons.recommend, tintColor: tintColor, title: 'Home' }));
                case "SettingScreenTab":
                    return (React.createElement(AnimationImage, { focused: navigation.isFocused(), icon: images_1.icons.analytics, tintColor: tintColor, title: 'Setting' }));
                default:
                    return null;
            }
        }
    }),
    initialRouteName: "HomeScreenTab",
    lazy: true,
    tabBarOptions: {
        activeTintColor: theme_1.colors.main,
        inactiveTintColor: "rgba(55, 55, 55, 0.5)",
        labelStyle: {
            fontSize: 10,
            fontWeight: "normal"
        },
        showLabel: false,
        style: {
            backgroundColor: "#ffffff",
            elevation: 3,
            shadowColor: "rgba(0, 0, 0, 0.05)",
            shadowOffset: {
                height: -10,
                width: 0
            },
            shadowOpacity: 1,
            shadowRadius: 24
        },
    }
});
const styles = react_native_1.StyleSheet.create({
    icon: {
        height: 15,
        width: 15
    }
});

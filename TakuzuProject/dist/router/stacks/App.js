"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const screens_1 = require("../../screens");
const AccountScreen_1 = __importDefault(require("../../screens/containers/AccountScreen"));
const Main_1 = require("../tabs/Main");
exports.App = react_navigation_1.createStackNavigator({
    Main: Main_1.Main,
    HomeScreen: screens_1.HomeScreen,
    AccountScreen: AccountScreen_1.default
}, {
    headerMode: "none",
    initialRouteName: 'Main',
    navigationOptions: {
        swipeEnabled: false
    }
});

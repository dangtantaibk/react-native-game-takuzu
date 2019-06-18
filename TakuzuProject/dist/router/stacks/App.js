"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const screens_1 = require("../../screens");
const PlayScreen_1 = __importDefault(require("../../screens/containers/PlayScreen"));
const RankScreen_1 = __importDefault(require("../../screens/containers/RankScreen"));
exports.App = react_navigation_1.createStackNavigator({
    HomeScreen: screens_1.HomeScreen,
    PlayScreen: PlayScreen_1.default,
    RankScreen: RankScreen_1.default
}, {
    headerMode: "none",
    initialRouteName: 'HomeScreen',
    navigationOptions: {
        swipeEnabled: false
    }
});

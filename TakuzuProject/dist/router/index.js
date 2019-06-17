"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const stacks_1 = require("./stacks");
const AppNavigator = react_navigation_1.createSwitchNavigator({
    App: stacks_1.App,
}, {
    initialRouteName: "App",
});
exports.default = react_navigation_1.createAppContainer(AppNavigator);

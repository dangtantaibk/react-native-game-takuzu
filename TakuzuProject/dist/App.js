"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_redux_1 = require("react-redux");
const react_3 = require("redux-persist/integration/react");
const router_1 = __importDefault(require("./router"));
const store_1 = require("./store");
class App extends react_2.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            hasError: false
        };
    }
    componentDidCatch(error) {
        this.setState({ error, hasError: true });
    }
    render() {
        return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.store },
            react_1.default.createElement(react_3.PersistGate, { loading: null, persistor: store_1.persistor },
                react_1.default.createElement(router_1.default, null))));
    }
}
exports.default = App;

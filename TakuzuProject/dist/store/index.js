"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_persist_1 = require("redux-persist");
const storage_1 = __importDefault(require("redux-persist/lib/storage"));
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const reducer_1 = __importDefault(require("./user/reducer"));
const persistConfig = {
    debug: __DEV__,
    key: "root",
    storage: storage_1.default,
    whitelist: ['AuthStore']
};
const rootReducer = redux_1.combineReducers({
    User: reducer_1.default,
});
const persistedReducer = redux_persist_1.persistReducer(persistConfig, rootReducer);
exports.store = redux_1.createStore(persistedReducer, redux_1.applyMiddleware(redux_thunk_1.default));
exports.persistor = redux_persist_1.persistStore(exports.store);

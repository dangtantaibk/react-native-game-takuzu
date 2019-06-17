"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.initState = {
    changeFontSizeHasError: false,
    changeFontSizeLoading: false,
    fontSizeForDisplay: 14,
};
function default_1(state = exports.initState, action) {
    switch (action.type) {
        case types_1.Types.ON_CHANGE_FONT_SIZE_REQUEST: {
            return Object.assign({}, state, { changeFontSizeHasError: false, changeFontSizeLoading: true });
        }
        case types_1.Types.ON_CHANGE_FONT_SIZE_SUCCESS: {
            return Object.assign({}, state, { fontSizeForDisplay: action.payload });
        }
        case types_1.Types.ON_CHANGE_FONT_SIZE_FAILURE: {
            return Object.assign({}, state, { changeFontSizeHasError: true, changeFontSizeLoading: false });
        }
        case types_1.Types.RESET_STATE: {
            return exports.initState;
        }
        default: return Object.assign({}, state);
    }
}
exports.default = default_1;

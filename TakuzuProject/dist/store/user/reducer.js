"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../helpers/common");
const MatrixModel_1 = require("../../models/application/MatrixModel");
const types_1 = require("./types");
exports.initState = {
    changeValueCardHasError: false,
    changeValueCardLoading: false,
    matrix: new MatrixModel_1.MatrixModel({
        matrix: common_1.createMatrix(4, 4, 2),
        timeCount: 0
    })
};
function default_1(state = exports.initState, action) {
    switch (action.type) {
        case types_1.Types.ON_CHANGE_VALUE_MATRIX_REQUEST: {
            return Object.assign({}, state, { changeValueCardHasError: false, changeValueCardLoading: true });
        }
        case types_1.Types.ON_CHANGE_VALUE_MATRIX_SUCCESS: {
            return Object.assign({}, state, { matrix: action.payload });
        }
        case types_1.Types.ON_CHANGE_VALUE_MATRIX_FAILURE: {
            return Object.assign({}, state, { changeValueCardHasError: true, changeValueCardLoading: false });
        }
        case types_1.Types.RESET_STATE: {
            return Object.assign({}, state, { matrix: new MatrixModel_1.MatrixModel({
                    matrix: common_1.createMatrix(4, 4, 2),
                    timeCount: 0
                }) });
        }
        default: return Object.assign({}, state);
    }
}
exports.default = default_1;

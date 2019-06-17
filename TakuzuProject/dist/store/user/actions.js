"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function changeFontSize(matrix) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            dispatch(OnChangeValueMatrixRequest());
            dispatch(OnChangeValueMatrixSuccess(matrix));
        }
        catch (error) {
            dispatch(OnChangeValueMatrixFailure(error));
        }
    });
}
exports.changeFontSize = changeFontSize;
function OnChangeValueMatrixRequest() {
    return {
        payload: undefined,
        type: types_1.Types.ON_CHANGE_VALUE_MATRIX_REQUEST
    };
}
function OnChangeValueMatrixSuccess(matrix) {
    return {
        payload: matrix,
        type: types_1.Types.ON_CHANGE_VALUE_MATRIX_SUCCESS
    };
}
function OnChangeValueMatrixFailure(error) {
    return {
        payload: error,
        type: types_1.Types.ON_CHANGE_VALUE_MATRIX_FAILURE
    };
}

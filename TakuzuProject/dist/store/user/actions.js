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
function changeFontSize(fontSize) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            dispatch(OnChangeFontSizeRequest());
            dispatch(OnChangeFontSizeSuccess(fontSize));
        }
        catch (error) {
            dispatch(OnChangeFontSizeFailure(error));
        }
    });
}
exports.changeFontSize = changeFontSize;
function OnChangeFontSizeRequest() {
    return {
        payload: undefined,
        type: types_1.Types.ON_CHANGE_FONT_SIZE_REQUEST
    };
}
function OnChangeFontSizeSuccess(fontSize) {
    return {
        payload: fontSize,
        type: types_1.Types.ON_CHANGE_FONT_SIZE_SUCCESS
    };
}
function OnChangeFontSizeFailure(error) {
    return {
        payload: error,
        type: types_1.Types.ON_CHANGE_FONT_SIZE_FAILURE
    };
}

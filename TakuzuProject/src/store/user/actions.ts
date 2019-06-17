import {CardModel} from "../../models/application/CardModel";
import { IDispatch, IThunkFunction } from "../index";
import {
    IOnChangeValueMatrixFailureAction, IOnChangeValueMatrixRequestAction,
    IOnChangeValueMatrixSuccessAction,
    Types
} from "./types";

function changeFontSize(matrix: CardModel[][]): IThunkFunction {
    return async (dispatch: IDispatch) => {
        try {
            dispatch(OnChangeValueMatrixRequest());
            dispatch(OnChangeValueMatrixSuccess(matrix));
        } catch (error) {
            dispatch(OnChangeValueMatrixFailure(error));
        }
    };
}

function OnChangeValueMatrixRequest(): IOnChangeValueMatrixRequestAction {
    return {
        payload: undefined,
        type: Types.ON_CHANGE_VALUE_MATRIX_REQUEST
    };
}

function OnChangeValueMatrixSuccess(matrix: CardModel[][]): IOnChangeValueMatrixSuccessAction {
    return {
        payload: matrix,
        type: Types.ON_CHANGE_VALUE_MATRIX_SUCCESS
    };
}

function OnChangeValueMatrixFailure(error: Error): IOnChangeValueMatrixFailureAction {
    return {
        payload: error,
        type: Types.ON_CHANGE_VALUE_MATRIX_FAILURE
    };
}

export {
    changeFontSize,
}

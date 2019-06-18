import {MatrixModel} from "../../models/application/MatrixModel";
import { IDispatch, IThunkFunction } from "../index";
import {
    IOnChangeValueMatrixFailureAction, IOnChangeValueMatrixRequestAction,
    IOnChangeValueMatrixSuccessAction, IResetStateAction,
    Types
} from "./types";
import reactotron from "reactotron-react-native";

function changeValueMatrix(matrix: MatrixModel): IThunkFunction {
    return async (dispatch: IDispatch) => {
        try {
            dispatch(OnChangeValueMatrixRequest());
            reactotron.log!('456', matrix);
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

function OnChangeValueMatrixSuccess(matrix: MatrixModel): IOnChangeValueMatrixSuccessAction {
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

function resetState(): IResetStateAction {
    return {
        payload: undefined,
        type: Types.RESET_STATE
    };
}

export {
    changeValueMatrix,
    resetState
}

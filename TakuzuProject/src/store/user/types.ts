import { IAction } from "../";
import {MatrixModel} from "../../models/application/MatrixModel";

export enum Types {
    ON_CHANGE_VALUE_MATRIX_REQUEST = "@@user/ON_CHANGE_VALUE_MATRIX_REQUEST",
    ON_CHANGE_VALUE_MATRIX_SUCCESS = "@@user/ON_CHANGE_VALUE_MATRIX_SUCCESS",
    ON_CHANGE_VALUE_MATRIX_FAILURE = "@@user/ON_CHANGE_VALUE_MATRIX_FAILURE",

    RESET_STATE = "@@user/RESET_STATE"
}

export interface IState {
    changeValueCardLoading: boolean;
    changeValueCardHasError: boolean;
    changeValueCardError?: Error;
    matrix: MatrixModel;
}

export interface IOnChangeValueMatrixRequestAction extends IAction<Types.ON_CHANGE_VALUE_MATRIX_REQUEST> { }

export interface IOnChangeValueMatrixSuccessAction extends IAction<Types.ON_CHANGE_VALUE_MATRIX_SUCCESS, MatrixModel> {
    payload: MatrixModel;
}
export interface IOnChangeValueMatrixFailureAction extends IAction<Types.ON_CHANGE_VALUE_MATRIX_FAILURE, Error> { }

export interface IResetStateAction extends IAction<Types.RESET_STATE> {
    type: Types.RESET_STATE
}



export type IActions =
    IOnChangeValueMatrixRequestAction
    | IOnChangeValueMatrixSuccessAction
    | IOnChangeValueMatrixFailureAction
    | IResetStateAction;

import {createMatrix} from "../../helpers/common";
import {MatrixModel} from "../../models/application/MatrixModel";
import {IActions, IState, Types} from "./types";


export const initState: IState = {
    changeValueCardHasError: false,
    changeValueCardLoading: false,
    matrix: new MatrixModel({
        matrix: createMatrix(4,4,2),
        timeCount: 0
    })


};

export default function (state: IState = initState, action: IActions): IState {
    switch (action.type) {

        case Types.ON_CHANGE_VALUE_MATRIX_REQUEST: {
            return {
                ...state,
                changeValueCardHasError: false,
                changeValueCardLoading: true
            };
        }

        case Types.ON_CHANGE_VALUE_MATRIX_SUCCESS: {
            return {
                ...state,
                matrix: action.payload,
            }
        }

        case Types.ON_CHANGE_VALUE_MATRIX_FAILURE: {
            return {
                ...state,
                changeValueCardHasError: true,
                changeValueCardLoading: false,
            };
        }

        case Types.RESET_STATE: {
            return {
                ...state,
                matrix: new MatrixModel({
                    matrix: createMatrix(4,4,2),
                    timeCount: 0
                })
            };
        }

        default: return {
                ...state
            };
    }
}

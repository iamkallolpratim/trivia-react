import * as types from './types';

const initState = {
    loading: false,
    data: []
};

export default function questionReducer(state = initState, action) {
    switch (action.type) {
        case types.LOAD_QUESTIONS:
            return {
                ...state,
                loading: true
            }
        case types.LOAD_QUESTIONS_SUCCESS:
            return state = {
                    questions: action.payload.results,
                    loading: false
                
            }
        default:
            return state;
    }
}
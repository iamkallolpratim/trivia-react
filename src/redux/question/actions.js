import * as types from './types';
import questionApi from '../../api/question';

function loadingQuestions() {
    return {
      type: types.LOAD_QUESTIONS
    }
  }
  
  function loadQuestionsSuccess(payload) {
    return {
      type: types.LOAD_QUESTIONS_SUCCESS,
      payload
    };
  }


  export function getQuestions() {
    return function(dispatch) {
      dispatch(loadingQuestions());
      return questionApi.getQuestions().then(data => {
        dispatch(loadQuestionsSuccess(data));
      });
    };
  }
  

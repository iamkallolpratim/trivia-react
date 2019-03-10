import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/question/actions';
import QuestionList from '../components/questionList';


class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isError: false,
            questions: [],
            currentQuestion: 0,
            score: 0,
            canProceed: false                       
        }
    }

    componentDidMount() {
        this.props.actions.getQuestions();
    }


    _renderHeader = (questions) => {
        const { currentQuestion, score } = this.state;
            return (
                <React.Fragment>
                    <div className='col-sm-6 '>
                    <p className="alert alert-primary">Score: { score }</p>
                   
                </div>
                <div className='col-sm-6 '>
                    <p className="alert alert-danger">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
                </React.Fragment>
            )
        
    }

    _answerSelected = (isCorrect) => {
        const { currentQuestion } = this.state;
        const { questions } = this.props;

        const score = this.state.score + (isCorrect ? 1 : 0);
        this.setState({
            score,
            canProceed: currentQuestion < questions.length - 1
        });
    }

    _nextQuestion = () => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            canProceed: false
        })
    }



    
    render() {
        const { questions, loading } = this.props;
        const { currentQuestion, canProceed } = this.state;
        return (
            <React.Fragment>
                
                <div className="row justify-content-md-center">
                
                <div className="col-sm-8">
                <div className="row  justify-content-md-center">
                { loading && <span className="text-danger">loading quizes</span> }
                { !loading  && questions&& this._renderHeader(questions) }
                </div>
                
                { questions && questions.length > 0 &&
                    <div className="card">
                            <div className="card-body">
                            <QuestionList question={questions[currentQuestion]} answerSelected={this._answerSelected.bind(this)} />
                            </div>
                    </div>
                }
                { canProceed && <button style={{marginTop:'1em'}}  className='btn btn-secondary btn-block' onClick={this._nextQuestion}>Next Question</button> }

                
                
                </div>
                </div>
                
            </React.Fragment>

        )
    }

}
const mapStateToProps = (state) => ({
    loading: state.question.loading,
    questions: state.question.questions
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
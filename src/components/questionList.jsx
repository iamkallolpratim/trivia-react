import React , {Component} from 'react';
import propTypes from 'prop-types';


export default class QuestionList extends Component {
    constructor(props) {
        super(props);

        const { correct_answer, incorrect_answers } = this.props.question;
        const answerList = this.shuffle(incorrect_answers.concat([correct_answer]));

        this.state = {
            hasAnswered: false,
            isCorrect: false,
            answerSelected: '',
            answerList
        };
    }

    static propTypes = {
        question: propTypes.object.isRequired,
        answerSelected: propTypes.func.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.question !== nextProps.question) {
            const { correct_answer, incorrect_answers } = nextProps.question;
            const answerList = this.shuffle(incorrect_answers.concat([correct_answer]));

            this.setState({
                hasAnswered: false,
                isCorrect: false,
                answerSelected: '',
                answerList
            });
        }
    }

    renderAnswer = answer => {
        const { hasAnswered, isCorrect, answerSelected } = this.state;

        if (!hasAnswered) {
            return <li className="list-group-item" key={answer} onClick={() => this.selectAnswer(answer)} dangerouslySetInnerHTML={{__html: answer}} />
        }

        let className = 'list-group-item';
        if (isCorrect && answer === answerSelected) {
            className = 'list-group-item bg-success text-white';
        } else if (!isCorrect && answer === answerSelected) {
            className = 'list-group-item bg-danger text-white';
        }

        return <li key={answer} className={className} dangerouslySetInnerHTML={{__html: answer}} />
    }

    selectAnswer = selected => {
        let isCorrect = true;
        if (selected === this.props.question.correct_answer) {
            this.setState({hasAnswered: true, isCorrect: true, answerSelected: selected});
        } else {
            isCorrect = false;
            this.setState({hasAnswered: true, isCorrect: false, answerSelected: selected});
        }

        this.props.answerSelected(isCorrect);
    }

    shuffle = array => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    render() {
        const { question } = this.props.question;

        return (
            <React.Fragment>
                <h6 className="alert alert-info" dangerouslySetInnerHTML={{__html: question}} />
                <ul className="list-group">
                    {this.state.answerList.map(this.renderAnswer)}
                </ul>
            </React.Fragment>
        );
    }

    
}
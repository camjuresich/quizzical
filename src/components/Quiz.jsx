export default function Quiz(props) {
    // number of buttons should be dependent on how many answers are available
    // if there are only two
    const { handleClick, question, answers, selectedAnswer, checkAnswers, correctAnswer } = props;

    const answerElements = answers.map((answer) => {
        // if () // answer is the correct answer
        let style = {

        }
        if (answer === correctAnswer) {
            style.backgroundColor = 'green'
        } else if (checkAnswers) {
            style.opacity = .5
        }
        return (<button
            className={`quiz--btn btn ${
                selectedAnswer === answer && "quiz--btn-selected"
            }`}
            onClick={handleClick} 
            disabled={checkAnswers}
            style={style}
        >
            {answer}
        </button>)
    });
    return (
        <div className="quiz--component">
            <h2 className="quiz--question">{question}</h2>
            <div className="answers">{answerElements}</div>
        </div>
    );
}

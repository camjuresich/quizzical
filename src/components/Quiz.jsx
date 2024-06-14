import { nanoid } from "nanoid";

export default function Quiz(props) {
    // number of buttons should be dependent on how many answers are available
    // if there are only two
    const {
        handleClick,
        question,
        answers,
        selectedAnswer,
        checkAnswers,
        correctAnswer,
    } = props;

    const answerElements = Object.values(answers).map((answer) => {
        // if () // answer is the correct answer
        let style = {};
        if (checkAnswers) {
            if (answer === correctAnswer) {
                style.backgroundColor = "#94D7A2";
                style.border = "solid 2px #94D7A2";
            } else if (selectedAnswer !== correctAnswer && answer === selectedAnswer) {
                style.backgroundColor = "#F8BCBC";
                style.border = "solid 2px #F8BCBC";
                style.opacity = 0.5;
            } else if (checkAnswers) {
                style.opacity = 0.5;
            }
        }
        return (
            <button
                key={nanoid()}
                className={`quiz--btn btn ${
                    selectedAnswer === answer && "quiz--btn-selected"
                }`}
                onClick={handleClick}
                disabled={checkAnswers}
                style={style}
            >
                {answer}
            </button>
        );
    });
    return (
        <div className="quiz--component">
            <h2 className="quiz--question">{question}</h2>
            <div className="answers">{answerElements}</div>
        </div>
    );
}

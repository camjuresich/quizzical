import { nanoid } from "nanoid";

export default function QuestionEl(props) {
    const {question, answers, selectedAnswer, correct_answer} = props.question;
    const {selectAnswer, answersSubmitted} = props;
    let styles = {}
    // the style needs to change on every answer button when the quiz is submitted

    return (
        <div className="question--component">
            <h2>{question}</h2>
            <div className="answer-container">
                {answers.map((answer) => {
                    if (answersSubmitted) {
                        if (answer === correct_answer) {
                            styles = {
                                backgroundColor: "#94D7A2",
                                border: "1px solid #94D7A2",
                            }
                        } else if (answer !== correct_answer && selectedAnswer === answer) {
                            styles = {
                                backgroundColor: "#F8BCBC",
                                border: "1px solid #F8BCBC",
                            }
                        } else {
                            styles = {
                                opacity: 0.5,
                            }
                        }
                            
                    } 
                    return (
                        <button
                            onClick={selectAnswer}
                            style={styles}
                            disabled={answersSubmitted}
                            className={`answer--btn btn ${
                                selectedAnswer === answer
                                    ? "answer--btn-selected"
                                    : ""
                            }`}
                            key={answer}
                        >
                            {answer}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    // number of buttons should be dependent on how many answers are available
}

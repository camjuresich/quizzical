import SplashScreen from "./components/Splash-Screen";
import QuestionEl from "./components/Question";
import Results from "./components/Results";
import Button from "./components/Button";
import dummy from "./assets/data";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

function App() {
    const [questionsData, setQuestionsData] = useState(null);
    const [quizIsStarted, setQuizIsStarted] = useState(false);
    const [answers, setAnswers] = useState({0: null, 1: null, 2: null, 3: null, 4: null});
    const [answersSubmitted, setAnswersSubmitted] = useState(false);
    const [loaded, setLoaded] = useState(0);
    let questionElements
    useEffect(() => {
        // const fetchData = () => {
        //     return new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve(dummy);
        //         }, 1000); // Simulate a 1-second delay
        //     });
        // };
        // fetchData()
        fetch("https://opentdb.com/api.php?amount=5")
        .then((response) => response.json())
        .then((data) => {
            setQuestionsData(() => {
                console.log(data)
                return data.results.map((questionData) => {
                    const incorrectAnswers = questionData.incorrect_answers.map((answer) => decode(answer));
                    const correctAnswer = decode(questionData.correct_answer);
                    return {
                        ...questionData,
                        id: nanoid(),
                        question: decode(questionData.question),
                        incorrect_answers: incorrectAnswers,
                        correct_answer: correctAnswer,
                        answers: [
                            ...incorrectAnswers,
                            correctAnswer,
                        ].sort(() => Math.random() - 0.5),
                        selectedAnswer: null,
                    };
                });
            });
            // Write what's supposed to happen with the data
        });
        
        return () => {
            setQuestionsData(null);
        }
        // fetchData()
    }, [loaded]);
    function selectAnswer (index, answer) {
        console.log(index)
        setAnswers((prevAnswers) => ({...prevAnswers, [index]: answer}));
        setQuestionsData((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index].selectedAnswer = answer;
            return updatedQuestions;
        });
    }
    function submitAnswers () {
        console.log(answers)
        setAnswersSubmitted(true);
    }
    function calculateScore () {
        return Object.values(answers).filter((answer, index) => questionsData[index].correct_answer === answer).length;
    }
    function endQuiz () {
        setQuizIsStarted(false);
        setAnswers({0: null, 1: null, 2: null, 3: null, 4: null});
        setAnswersSubmitted(false);
        setLoaded(prevState => prevState + 1);
    }
    if (quizIsStarted) {
        questionElements = questionsData.map((question, index) => {
            return (
                <QuestionEl 
                    key={question.id} 
                    question={question}
                    selectAnswer={(e) => selectAnswer(index, e.target.innerText)}
                    answersSubmitted={answersSubmitted}
                />
            )
        })
    }
    return (
        <div>
            {!quizIsStarted && (
                <SplashScreen
                    button={
                        <Button
                            text="Start quiz"
                            handleClick={() => setQuizIsStarted(true)}
                            className="splash--btn btn"
                            conditionalRender={questionsData}
                            conditionalText="Loading..."
                        />
                    }
                />
            )}
            {quizIsStarted && 
                questionElements
            }
            {quizIsStarted && !answersSubmitted &&
                <Button
                    text="Submit"
                    handleClick={() => submitAnswers()}
                    className="submit--btn btn"
                    conditionalRender={Object.values(answers).every((answer) => answer !== null)}
                    conditionalText="Please select your answers."
                />
            }
            {answersSubmitted &&
                <Results 
                    answers={answers} 
                    questionsData={questionsData} 
                    score={calculateScore()}
                    questionAmount={questionsData.length}
                    button={
                        <Button
                            text="Get more questions"
                            handleClick={() => endQuiz()}
                            className="splash--btn btn"
                            conditionalRender={true}
                        />
                    }
                />
            }
        </div>
    );
}
export default App;

// function decodeData(str) {
//     str.split(/&[^;]*;/);
//     return str.replaceAll(/&[^;]*;/g, (entity) => decode(entity));
// }

import SplashScreen from "./components/Splash-Screen";
import Quiz from "./components/Quiz";
import data from "./assets/data";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { encode, decode } from "html-entities"; 

const questionsArr = data.results;
/* One way to ensure that a user cannot see the data by going into their developer console is to 
    wrap the answer data in a function that only shows the data when the other conditions are met.
    i.e. quizIsStarted, checkAnswers. if check answers is true that means they submitted the test. 
    This means we can safely display the answers so the function will run and it can be the set as 
    props on the Quiz components 
*/
function App() {
    const [quizIsStarted, setQuizIsStarted] = useState(false);
    const [answers, setAnswers] = useState({});
    const [checkAnswers, setCheckAnswers] = useState(false)

    function decodeData (str) {
        str.split(/&[^;]*;/)
        return str.split(/&[^;]*;/)
    }

    const quiz = questionsArr.map((el) => {
        console.log(decodeData(el.question))
        return  {
        ...el,
        selectedAnswer: "",
        id: nanoid(),
        question: el.question,
        answers: [...el.incorrect_answers, el.correct_answer].sort(
            () => Math.random() - 0.5
        ),
    }});
    const [prompts, setPrompts] = useState(quiz);
    // why is the check answers button showing up early? 
    function selectAnswer(answer, currentAnswerObj) {
        setAnswers((prevAnswers) => { // answers is an object
            return {...prevAnswers,
                [currentAnswerObj.id]: [answer]
            }
        })
        setPrompts((prevState) => {
            const newState = prevState.map((obj) => {
                if (currentAnswerObj.question === obj.question) {
                    return { ...obj, selectedAnswer: answer };
                }
                return obj;
            });
            return newState;
        });
    }

    const quizElements = prompts.map((el) => {
        return (
            <Quiz
                key={el.id}
                handleClick={(e) => selectAnswer(e.target.textContent, el)}
                question={el.question}
                answers={el.answers}
                selectedAnswer={el.selectedAnswer}
                checkAnswers={checkAnswers}
                correctAnswer={el.correct_answer}
            />
        );
    });

    
    ///////////////////////////////////////////////////
    // FEATURE REQUEST
    ///////////////////////////////////////////////////
    // add a new state variable that will check if the button to end the quiz is checked
    // The state should be passed to the quiz element?
    // if the state is true then the quiz will be rendered with the answer you selected
    // the correct answer will be shown in green
    // the bottom div that normally shows the check answers button should have your score and 
    // the 
    return (
        <>
            {!quizIsStarted && (
                <SplashScreen handleClick={() => setQuizIsStarted(true)} />
            )}
            {quizIsStarted && (
                <div>
                    {quizElements}
                    <div className="btn-container">
                        {Object.values(answers).length === 5 ? (
                            <button 
                            className="btn"
                            onClick={() => setCheckAnswers(true)}
                            >Check Answers</button>
                        ) : (
                            <h2>Please answer all questions</h2>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default App;

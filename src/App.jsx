import SplashScreen from "./components/Splash-Screen";
import Quiz from "./components/Quiz";
import Results from "./components/Results"
import data from "./assets/data";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

const questionsArr = data.results; //await grabData()
/* One way to ensure that a user cannot see the data by going into their developer console is to 
    wrap the answer data in a function that only shows the data when the other conditions are met.
    i.e. quizIsStarted, checkAnswers. if check answers is true that means they submitted the test. 
    This means we can safely display the answers so the function will run and it can be the set as 
    props on the Quiz components 
    */
// console.log(grabData())

function App() {
    const [quizIsStarted, setQuizIsStarted] = useState(false);
    const [answers, setAnswers] = useState({});
    const [checkAnswers, setCheckAnswers] = useState(false);
    const [prompts, setPrompts] = useState([]);
    const [quizIsOver, setQuizIsOver] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0)
    useEffect(() => {
        console.log("effect ran");
        //////////////////////////////////////
        // FETCH REQUESTS COMMENTS OUT TO PREVENT TOO MANY REQUESTS
        //////////////////////////////////////
        // fetch("https://opentdb.com/api.php?amount=5")
        //     .then((res) => res.json())
        //     .then((data) =>
        setPrompts(
            questionsArr.map((el) => {
                // data.results.map((el) => {
                return {
                    ...el,
                    selectedAnswer: "",
                    id: nanoid(),
                    question: decode(el.question),
                    answers: [...el.incorrect_answers, el.correct_answer]
                        .map((e) => decode(e))
                        .sort(() => Math.random() - 0.5),
                };
            })
        );
        // );
        return () => {};
    }, []);

    function selectAnswer(answer, currentAnswerObj) {
        setAnswers((prevAnswers) => {
            // answers is an object
            return { ...prevAnswers, [currentAnswerObj.id]: [answer] };
        });
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

    function endQuiz() {
        setCheckAnswers(true);
        setQuizIsOver(true);
        setCorrectAnswers(() => {
            let count = 0
            // prompts have an id key on them that is the same as what is on the  answers object
            Object.keys(answers).forEach(key => {
                prompts.find(el=> {
                    if (el.id === key)
                    // console.log('found it', el.correct_answer, answers[key])
                    if (el.correct_answer === answers[key][0]) {
                        count++
                    }
                })
            })
            return count
           // loop over the answers keys
           // check for the key in the prompts array
           // when you find the key...
           // if the answer at that key in the answers object equals prompts.correct_answer
                // add one to the count variable.
        })
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
    // the correct answer will be shown in green //
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
                    {!quizIsOver && <div className="btn-container">
                        {Object.values(answers).length === 5 ? (
                            <button
                                className="btn"
                                onClick={()=>endQuiz()}
                            >
                                Check Answers
                            </button>
                        ) : (
                            <h2>Please answer all questions</h2>
                        )}
                        {/* {quizIsOver && <h1>The quiz is over</h1>} */}
                    </div>}
                    {quizIsOver && 
                        < Results 
                            score={correctAnswers}
                            questionAmount={prompts.length}
                        />
                    }
                </div>
            )}
        </>
    );
}

export default App;

// function decodeData(str) {
//     str.split(/&[^;]*;/);
//     return str.replaceAll(/&[^;]*;/g, (entity) => decode(entity));
// }

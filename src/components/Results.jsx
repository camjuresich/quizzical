export default function Results (props) {
    return (
        <div className="results--container">
            <p>You got {props.score} out of {props.questionAmount} correct</p>
            {props.button}
        </div>
    )
}
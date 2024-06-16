export default function Button(props) {
    if (!props.conditionalRender) {
        return (
            <h2 className="loading-text">{props.conditionalText}</h2>
        )
    }
    return (
        <button className={props.className} onClick={props.handleClick}>{props.text}</button>
    )
}
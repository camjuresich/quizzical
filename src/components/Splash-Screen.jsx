export default function SplashScreen (props) {
    return (
        <div className='splash--component'>
            <img src={props.squiggle} alt="" />
            <h1 className="splash--title">Quizzical</h1>
            <h2 className="splash--subheading">Some description if needed</h2>
            <button className="splash--btn btn" onClick={props.handleClick}>Start quiz</button>
        </div>
    ) }

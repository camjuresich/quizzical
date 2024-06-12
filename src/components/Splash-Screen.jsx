export default function SplashScreen (props) {
    return (
        <div className='splash--component'>
            <img src={props.squiggle} alt="" />
            <h1>Quizzical</h1>
            <h2>Some description if needed</h2>
            <button className="splash--button">Start quiz</button>
        </div>
    ) }

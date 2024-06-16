export default function SplashScreen (props) {
    return (
        <div className='splash--component'>
            <h1 className="splash--title">Quizzical</h1>
            <h2 className="splash--subheading">Some description if needed</h2>
            {props.button}
        </div>
    ) }

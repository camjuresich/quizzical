import squiggleYelImg from './assets/yellow-squiggle.svg'
import squigglePurImg from './assets/purple-squiggle.svg'
import SplashScreen from './components/Splash-Screen'
import Squiggle from './components/Squiggle'

function App() {

  return (
    <>
      < Squiggle squiggle={squiggleYelImg} />
      < SplashScreen />     
    </>
    
  )
}

export default App

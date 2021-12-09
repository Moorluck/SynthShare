
import './App.scss';
import Main from './container/main/main';
import { useState } from 'react';
import ToneHelper from './synth-helper/synth-helper';

function App() {

  const [mainJSX, setMainJSX] = useState(<></>)
  const [buttonLaunchVisibility, setButtonLaunchVisibility] = useState(true)
  
  function launch() {
    ToneHelper.start()
      .then(() => {
        setButtonLaunchVisibility(false)
        setMainJSX(<Main></Main>)
      })
  }

  return (
    <div className="App">
      {
        (buttonLaunchVisibility) ? (
          <button onClick={launch}>Launch</button>
        ) : (
          ""
        )
      }
      
      {mainJSX}
    </div>
  );
}

export default App;

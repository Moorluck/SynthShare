
import './App.scss';
import Main from './container/main/main';
import { useState } from 'react';
import ToneHelper from './synth-helper/synth-helper';
import AsideLeft from './container/aside-left/aside-left';
import AsideRight from './container/aside-right/aside-right';

function App() {

  const [buttonLaunchVisibility, setButtonLaunchVisibility] = useState(true)
  const [visible, setVisible] = useState(false)
  
  function launch() {
    ToneHelper.start()
      .then(() => {
        setButtonLaunchVisibility(false)
        setVisible(true)
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

      {
        (visible) && (
          <>
            <AsideLeft></AsideLeft>
            <Main></Main>
            <AsideRight></AsideRight>
          </>
        )
      }
      
    </div>
  );
}

export default App;

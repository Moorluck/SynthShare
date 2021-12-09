
import './App.scss';
import Main from './container/main/main';
import { useState } from 'react';
import ToneHelper from './synth-helper/synth-helper';
import AsideLeft from './container/aside-left/aside-left';
import AsideRight from './container/aside-right/aside-right';

function App() {

  const [mainJSX, setMainJSX] = useState(<></>)
  const [asideLeftJSX, setAsideLeftJSX] = useState(<></>)
  const [asideRightJSX, setAsideRightJSX] = useState(<></>)
  const [buttonLaunchVisibility, setButtonLaunchVisibility] = useState(true)
  
  function launch() {
    ToneHelper.start()
      .then(() => {
        setButtonLaunchVisibility(false)
        setAsideLeftJSX(<AsideLeft></AsideLeft>)
        setMainJSX(<Main></Main>)
        setAsideRightJSX(<AsideRight></AsideRight>)
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
      {asideLeftJSX}
      {mainJSX}
      {asideRightJSX}
    </div>
  );
}

export default App;

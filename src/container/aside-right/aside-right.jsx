import { useState } from "react"
import style from "./aside-right.module.scss"
import ToneHelper from "../../synth-helper/synth-helper"
import Effect from "../../synth-helper/effect"

const AsideRight = function(props) {

    const [reverb, setReverb] = useState(false)

    function handleReverbChange(checked) {
        if (checked) {
            ToneHelper.effect = Effect.reverb
            ToneHelper.changeSynth()
        }
        else {
            ToneHelper.effect = Effect.none
            ToneHelper.changeSynth()
        }
    }

    return (
        <div className={style.main}>
            <div>
                <input type="checkbox" name="reverb" id="reverb" onChange={(e) => handleReverbChange(e.target.checked)}/><label htmlFor="reverb">Reverb</label>
            </div>
        </div>
    )
}

export default AsideRight
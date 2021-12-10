import { useEffect, useState } from "react"
import style from "./menu.module.scss"
import ToneHelper from "../../synth-helper/synth-helper"
import Mode from "../../synth-helper/mode"
import { Tone } from "tone/build/esm/core/Tone"

const Menu = function(props) {

    const {onClickClear} = props
    const [scale, setScale] = useState("C")
    const [mode, setMode] = useState("major")
    const [sound, setSound] = useState("sine")
    const [tempo, setTempo] = useState(120)

    useEffect(() => {
        ToneHelper.mode = Mode[scale][mode]
    }, [mode, scale])

    useEffect(() => {
        ToneHelper.setTempo(tempo)
    }, [tempo])

    useEffect(() => {
        ToneHelper.type = sound
        ToneHelper.changeSynth(sound)
    }, [sound])

    function onTempoChange(value) {
        if (value < 200) {
            setTempo(value)
        }

        else {
            setTempo(120)
        }
    }

    return (
        <div className={style.main}>
            <button onClick={onClickClear}>Clear</button>
            
            <select name="scale" id="select-scale" onChange={(e) => setScale(e.target.value)} value={scale}>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="A">A</option>
                <option value="B">B</option>
            </select>

            <select name="mode" id="select-mode" onChange={(e) => setMode(e.target.value)} value={mode}>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
                <option value="dorian">Dorian</option>
                <option value="myxolidian">Myxolidian</option>
            </select>

            <input type="number" onChange={(e) => onTempoChange(e.target.value)} value={tempo}></input>

            <select name="sound" id="select-sound" onChange={(e) => setSound(e.target.value)} value={sound}>
                <option value="sine">Sine</option>
                <option value="pulse">Pulse</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
            </select>

        </div>
    )
}

export default Menu
import { useEffect, useState } from "react"
import style from "./grid.module.scss"
import ToneHelper from "../../synth-helper/synth-helper"

const Grid = function(props) {

    const {list, currentTime, onCellClick, playing} = props
    const [listJSX, setListJSX] = useState([])
    const [synthList, setSynthList] = useState([])
    const [synthAlreadyInit, setSynthAlreadyInit] = useState(false)

    function updateListDisplay() {
        const listOfCell = []

        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[0].length; j++) {
                listOfCell.push(
                    <div key={i + "-" + j} onClick={(e) => onCellClick(i, j)}
                        className={
                            ((list[i][j] === 1) ? style.active : "") + " " + ((j===currentTime) ? style.playing : "")
                        }>
                    </div>
                )
            }
        }

        setListJSX(listOfCell)
    }

    function updateLoop() {
        if (synthList.length !== 0) {
            ToneHelper.updateLoop(list, synthList)
        }
    }

    useEffect(() => {
        updateListDisplay()
    }, [list, currentTime])
    

    useEffect(() => {
        if (list.length > 0 && !synthAlreadyInit) {
            ToneHelper.start().then(() => {
                setSynthList(previousSynthList => ToneHelper.createSynth(list))
                setSynthAlreadyInit(true)
            })
        }
        else {
            updateLoop()
        }

    }, [list])

    return (
        <>
            <button onClick={() => console.log(synthList)}>List</button>
            <div className={style.grid}>
                {listJSX}
            </div>
        </>
        
    )
}

export default Grid
import { Fragment, useEffect, useState } from "react"
import { Tone } from "tone/build/esm/core/Tone"
import Grid from "../../component/grid/grid"
import Menu from "../../component/menu/menu"
import ToneHelper from "../../synth-helper/synth-helper"
import style from "./main.module.scss"

const Main = function(props) {

    const gridHeight = 14
    const gridWidth = 16

    const [list, setList] = useState([])
    const [currentTime, setCurrentTime] = useState(0)
    const [synthList, setSynthList] = useState([])
    const [mode, setMode] = useState(["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5"])

    useEffect(() => {
        ToneHelper.play()
        setSynthList(ToneHelper.createSynth(gridHeight, "fatsine"))
        clearList()
    }, [])

    useEffect(() => {
        startTime()
    }, [list])

    function clearList() {
        console.log("clear");
        setList([])

        for (let i = 0; i < gridHeight; i++) {
            const row = []
            for (let j = 0; j < gridWidth; j++) {
                row.push(0)
            }

            setList(
                previousList => [...previousList, row]
            )
        }
    }

    function updateBeat() {
        setCurrentTime(previousTime => {
            if (previousTime < 15) {
                return previousTime + 1
            }
            else {
                return 0
            }
        })
    }

    function startTime() {
        ToneHelper.cancel()
        ToneHelper.scheduleRepeat(list, synthList, mode, () => {
            updateBeat()
        })
    }

    function handleCellClick(rowIndex, columnIndex) {
        console.log("handleclick");
        const newList = []
        for (let i = 0; i < list.length; i++) {
            const row = []
            for (let j = 0; j < list[0].length; j++) {
                if (i === rowIndex && j === columnIndex) {
                    if (list[i][j] === 1) {
                        row.push(0)
                    }
                    else {
                        row.push(1)
                    }
                }
                else {
                    row.push(list[i][j])
                }
            }
            newList.push(row)
        }
        setList(
            previousList => newList
        )
    }

    return (
        <div className={style.main}>
            <Menu onClickClear={clearList}></Menu>
            <Grid list={list} onCellClick={handleCellClick} currentTime={currentTime}></Grid>
        </div>
    )
}

export default Main
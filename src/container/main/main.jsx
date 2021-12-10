import { useEffect, useState } from "react"
import Grid from "../../component/grid/grid"
import Menu from "../../component/menu/menu"
import ToneHelper from "../../synth-helper/synth-helper"
import style from "./main.module.scss"

const Main = function(props) {

    const gridHeight = 14
    const gridWidth = 16

    const [list, setList] = useState([])
    const [currentTime, setCurrentTime] = useState(0)
    const [loopInitialize, setLoopInitialize] = useState(false)

    useEffect(() => {
        ToneHelper.play()
        clearList()
        ToneHelper.synthList = ToneHelper.createSynth(gridHeight, "sine")
    }, [])

    useEffect(() => {
        ToneHelper.list = list
    }, [list])

    useEffect(() => {
        if (!loopInitialize && ToneHelper.list.length !== 0 && ToneHelper.synthList.length !== 0) {
            ToneHelper.cancel()
            ToneHelper.scheduleRepeat((time) => {
                updateBeat()
                ToneHelper.updateLoop(time)
            })
            setLoopInitialize(true)
        }   
    }, [list, loopInitialize])

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
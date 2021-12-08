import { Fragment, useEffect, useState } from "react"
import Grid from "../../component/grid/grid"
import Menu from "../../component/menu/menu"
import style from "./main.module.scss"

const Main = function(props) {

    const gridHeight = 14
    const gridWidth = 16
    const [list, setList] = useState([])

    useEffect(() => {
        clearList()
    }, [])

    function clearList() {
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

    function handleCellClick(rowIndex, columnIndex) {
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
            <Grid list={list} onCellClick={handleCellClick}></Grid>
        </div>
    )
}

export default Main
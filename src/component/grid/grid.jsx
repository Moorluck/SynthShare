import { useEffect, useState } from "react"
import style from "./grid.module.scss"

const Grid = function(props) {

    const {list, onCellClick} = props
    const [listJSX, setListJSX] = useState([])

    useEffect(() => {
        console.log(list)
        const listOfCell = []
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[0].length; j++) {
                listOfCell.push(
                    <div key={i + "-" + j} onClick={(e) => onCellClick(i, j)}
                        className={(list[i][j] === 1) ? style.active : ""}></div>
                )
            }
        }

        setListJSX(listOfCell)
    }, [list])
    

    return (
        <div className={style.grid}>
            {listJSX}
        </div>
    )
}

export default Grid
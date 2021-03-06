
import style from "./grid.module.scss"

const Grid = function(props) {

    const {list, currentTime, onCellClick} = props

    const listJSX = updateListDisplay()

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

        return listOfCell
    }

    return (
        <>
            <div className={style.grid}>
                {listJSX}
            </div>
        </>
        
    )
}

export default Grid
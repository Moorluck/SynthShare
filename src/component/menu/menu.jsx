import style from "./menu.module.scss"

const Menu = function(props) {

    const {onClickClear} = props

    return (
        <div className={style.main}>
            <button onClick={onClickClear}>Clear</button>
            <select name="mode" id="select-mode">
                <option value="major">Major</option>
                <option value="minor">Minor</option>
            </select>
        </div>
    )
}

export default Menu
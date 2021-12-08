import style from "./menu.module.scss"

const Menu = function(props) {

    const {onClickClear} = props

    return (
        <div className={style.main}>
            <button onClick={onClickClear}>Clear</button>
        </div>
    )
}

export default Menu
import {typeButtons} from "../../../enums/typeButtons";
import styles from './ButtonBigClick.module.scss'
import {FC} from "react";

interface ButtonBigClickProps {
    click: any,
    type: typeButtons
}
const ButtonBigClick : FC<ButtonBigClickProps> = ({click, type}) => {
        switch (type) {
            case typeButtons.add:
                return <button className={styles.button} onClick={click}>Добавить</button>
            case typeButtons.delete:
                return <button className={styles.button} onClick={click}>Удалить</button>
            default:
                return <button className={styles.button} onClick={click}>Добавить</button>
        }
}
export default ButtonBigClick;

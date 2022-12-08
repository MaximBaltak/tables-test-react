import styles from  './CheckBox.module.scss'
import {FC, useId} from "react";
interface CheckBoxProps {
    click: any,
    checked: boolean|undefined,
}
const CheckBox: FC<CheckBoxProps> = ({click,checked}) => {
    const id:string = useId()
    return (
        <>
            <input onChange={click} checked={checked} className={styles.check} id={id} type="checkbox"/>
            <label className={styles.label} htmlFor={id}></label>
        </>
    )
}

export default CheckBox;

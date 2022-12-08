import React, {ChangeEvent, FC} from 'react';
import CheckBox from "../../buttons/checkBox/CheckBox";
import styles from './StaffComponent.module.scss'
import {Staff} from "../../../store/type";
import {
    changeInputStaff,
    changeSelectedStaff
} from "../../../store/slices/tablesSlice";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {EditableInputs} from "../../../enums/editableInputs";

interface staffComponentProps {
    staff: Staff
}

const StaffComponent: FC<staffComponentProps> = ({staff}) => {
    const dispatch = useAppDispatch()
    const updateChecked = (e: ChangeEvent<HTMLInputElement>): void => {
        e.stopPropagation()
        const checked: boolean = e.target.checked
        const payload = {
            staff,
            isAdd: checked
        }
        dispatch(changeSelectedStaff(payload))
    }
    return (
        staff.isEdit ?
            <>
                <td style={{background: staff.isCheck ? '#36abff69' : ''}} className={styles.content}></td>
                <td style={{background: staff.isCheck ? '#36abff69' : ''}} className={styles.content}>
                    <input className={styles.input} value={staff.firstName} type="text"
                           onChange={(e) => dispatch(changeInputStaff({
                               text: e.target.value,
                               id_staff: staff.id,
                               id_company: staff.id_company,
                               input: EditableInputs.firstNameStaff
                           }))}/>
                </td>
                <td style={{background: staff.isCheck ? '#36abff69' : ''}} className={styles.content}>
                    <input className={styles.input} value={staff.lastName} type="text"
                           onChange={(e) => dispatch(changeInputStaff({
                               text: e.target.value,
                               id_staff: staff.id,
                               id_company: staff.id_company,
                               input: EditableInputs.lastNameStaff
                           }))}/>
                </td>
                <td style={{background: staff.isCheck ? '#36abff69' : ''}} className={styles.content}>
                    <input className={styles.input} value={staff.position} type="text"
                           onChange={(e) => dispatch(changeInputStaff({
                               text: e.target.value,
                               id_staff: staff.id,
                               id_company: staff.id_company,
                               input: EditableInputs.positionStaff
                           }))}/>
                </td>
            </>
            :
            <>
                <td style={{background: staff.isCheck ? '#36abff69' : ''}} className={styles.content}><CheckBox
                    checked={staff.isCheck} click={updateChecked}/></td>
                <td style={{background: staff.isCheck ? '#36abff69' : ''}}
                    className={styles.content}>{staff.firstName}</td>
                <td style={{background: staff.isCheck ? '#36abff69' : ''}}
                    className={styles.content}>{staff.lastName}</td>
                <td style={{background: staff.isCheck ? '#36abff69' : ''}}
                    className={styles.content}>{staff.position}</td>
            </>
    );
};

export default StaffComponent;

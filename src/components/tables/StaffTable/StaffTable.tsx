import React from 'react';
import ButtonBigClick from "../../buttons/buttonBigClick/ButtonBigClick";
import {typeButtons} from "../../../enums/typeButtons";
import styles from './StaffTable.module.scss';
import StaffComponent from "../Staff/StaffComponent";
import {Staff} from "../../../store/type";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {addStaff, deleteStaff, openEditorStaff} from "../../../store/slices/tablesSlice";

const StaffTable = () => {
    const staff: Staff[] = useAppSelector(state => state.tableReducer.staffTable)
    const dispatch = useAppDispatch()
    return (
        <div className={styles.container}>
            <h2 className={styles.text}>Сотрудники</h2>
            <div className={styles.buttons}>
                <ButtonBigClick click={()=>dispatch(addStaff())} type={typeButtons.add}/>
                <ButtonBigClick click={()=>dispatch(deleteStaff())} type={typeButtons.delete}/>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.header}/>
                    <th className={styles.header}>Имя</th>
                    <th className={styles.header}>Фамилия</th>
                    <th className={styles.header}>Должность</th>
                </tr>
                </thead>
                <tbody>
                {staff.length > 0 ?
                    staff.map(staff =><tr className={styles.row}
                                          onDoubleClick={()=>dispatch(openEditorStaff({id:staff.id,id_company: staff.id_company}))} key={staff.id}>
                        <StaffComponent staff={staff}/></tr>):null
                }
                </tbody>
            </table>
        </div>
    );
};

export default StaffTable;

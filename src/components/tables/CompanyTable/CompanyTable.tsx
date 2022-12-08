import React from 'react';
import ButtonBigClick from "../../buttons/buttonBigClick/ButtonBigClick";
import {typeButtons} from "../../../enums/typeButtons";
import styles from './CompanyTable.module.scss'
import {useAppSelector} from "../../../hooks/useAppSelector";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import CompanyComponent from "../Company/CompanyComponent";
import {addCompany, deleteCompany, openEditorCompany} from "../../../store/slices/tablesSlice";

const CompanyTable = () => {
    const company = useAppSelector(state => state.tableReducer.company)
    const dispatch = useAppDispatch()
    return (
        <div className={styles.container}>
            <h2 className={styles.text}>Компании</h2>
            <div className={styles.buttons}>
                <ButtonBigClick click={()=>dispatch(addCompany())} type={typeButtons.add}/>
                <ButtonBigClick click={()=>dispatch(deleteCompany())} type={typeButtons.delete}/>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.header}>Чекбокс</th>
                    <th className={styles.header}>Компания</th>
                    <th className={styles.header}>Кол-во сотрудников</th>
                    <th className={styles.header}>Адрес</th>
                </tr>
                </thead>
                <tbody>
                {company.length > 0 ?
                    company.map(company =>
                        <tr id={company.isEdit ? '1':'0'} onDoubleClick={()=>dispatch(openEditorCompany({id:company.id}))}
                            className={styles.row} key={company.id}>
                        <CompanyComponent company={company}/>
                    </tr>):<tr aria-colspan={5}>Нет данных</tr>
                }
                </tbody>
            </table>
        </div>
    );
};

export default CompanyTable;

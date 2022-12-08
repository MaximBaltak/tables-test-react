import React, {ChangeEvent, FC} from 'react';
import CheckBox from "../../buttons/checkBox/CheckBox";
import styles from './CompanyComponent.module.scss'
import {Company} from "../../../store/type";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {
    changeInputCompany,
    changeSelectedCompany
} from "../../../store/slices/tablesSlice";
import {EditableInputs} from "../../../enums/editableInputs";

interface companyProps {
    company: Company
}

const CompanyComponent: FC<companyProps> = ({company}) => {
    const dispatch = useAppDispatch()
    const updateChecked = (e: ChangeEvent<HTMLInputElement>): void => {
        e.stopPropagation()
        const checked: boolean = e.target.checked
        const payload = {
            company,
            isAdd: checked
        }
        dispatch(changeSelectedCompany(payload))
    }
    return (
        company.isEdit ?
            <>
                <td style={{background: company.isCheck ? '#36abff69' : ''}} className={styles.content}></td>
                <td style={{background: company.isCheck ? '#36abff69' : ''}}
                    className={styles.content}>
                    <input className={styles.input} value={company.title} type="text"
                           onChange={(e)=>dispatch(changeInputCompany({text:e.target.value,id_company:company.id,input:EditableInputs.titleCompany}))}/>
                </td>
                <td style={{background: company.isCheck ? '#36abff69' : ''}}
                    className={styles.content}>{company.staff.length}</td>
                <td style={{background: company.isCheck ? '#36abff69' : ''}}
                    className={styles.content}>
                    <input className={styles.input} value={company.address} type="text"
                           onChange={(e)=>dispatch(changeInputCompany({text:e.target.value,id_company:company.id,input:EditableInputs.addressCompany}))}/>
                </td>
            </> :
            <>
                <td style={{background: company.isCheck ? '#36abff69' : ''}}
                    className={styles.content}><CheckBox checked={company.isCheck} click={updateChecked}/></td>
                <td style={{background: company.isCheck ? '#36abff69' : ''}}
                    className={styles.content}>{company.title}</td>
                <td style={{background: company.isCheck ? '#36abff69' : ''}}
                    className={styles.content}>{company.staff.length}</td>
                <td style={{background: company.isCheck ? '#36abff69' : ''}}
                    className={styles.content}>{company.address}</td>
            </>
    );
};

export default CompanyComponent

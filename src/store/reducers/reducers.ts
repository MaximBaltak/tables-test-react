import {Company, Staff, StateTable} from "../type";
import data from "../../data.json";
import TableService from "../../services/DataTableServices";
import {PayloadAction} from "@reduxjs/toolkit";
import {EditableInputs} from "../../enums/editableInputs";
import {TypeTables} from "../../enums/typeTables";

export default {
    initState(state: StateTable) {
        const res: Company[] = JSON.parse(JSON.stringify(data))
        TableService.initStateTable(state, res)
    },
    addCompany(state: StateTable) {
        const company: Company = {
            id: Math.floor(Math.random() * 100000),
            isCheck: false,
            isEdit: true,
            title: '',
            address: '',
            staff: []
        }
        TableService.addCompany(state.company, company)
    },
    changeInputCompany(state: StateTable, action: PayloadAction<{ text: string, id_company: number, input: EditableInputs }>) {
        const {text, id_company, input} = action.payload
        TableService.saveCompany(state.company, text, id_company, input)
    },
    changeInputStaff(state: StateTable, action: PayloadAction<{ text: string, id_staff: number, id_company: number, input: EditableInputs }>) {
        const {text, id_company, input, id_staff} = action.payload
        TableService.saveStaff(state, text, id_staff, id_company, input)
    },
    addStaff(state: StateTable) {
        const id_company: number = state.selectedCompany[state.selectedCompany.length - 1].id
        const staff: Staff = {
            id: Math.floor(Math.random() * 100000),
            isCheck: false,
            isEdit: true,
            firstName: '',
            lastName: '',
            position: '',
            id_company,
        }
        TableService.addStaff(state, staff, id_company)
    },
    closeEditor(state: StateTable, action: PayloadAction<{ typeTable: TypeTables, id_company: number, id_staff: number }>) {
        const {typeTable, id_company, id_staff} = action.payload
        switch (typeTable) {
            case TypeTables.company:
                TableService.closeEditorCompany(state.company, id_company)
                break
            case TypeTables.staff:
                TableService.closeEditorStaff(state.company, id_staff, id_company)
                break
            default:

        }

    },
    openEditorStaff(state: StateTable, action: PayloadAction<{ id: number, id_company: number }>) {
        const {id, id_company} = action.payload
        TableService.openEditorStaff(state, id, id_company)
    },
    openEditorCompany(state: StateTable, action: PayloadAction<{ id: number }>) {
        const id = action.payload.id
        TableService.openEditorCompany(state.company, id)
    },
    deleteStaff(state: StateTable) {
        TableService.deleteStaff(state)
    },
    deleteCompany(state: StateTable) {
        TableService.deleteCompany(state)
    },
    changeSelectedStaff(state: StateTable, action: PayloadAction<{ staff: Staff, isAdd: boolean }>) {
        const {staff, isAdd} = action.payload
        if (isAdd) {
            TableService.addSelectedStaff(state, staff)
        } else {
            TableService.removeSelectedStaff(state, staff.id)
        }

    },
    changeSelectedCompany(state: StateTable, action: PayloadAction<{ company: Company, isAdd: boolean }>) {
        const {company, isAdd} = action.payload
        if (isAdd) {
            TableService.addSelectedCompany(state, company)
        } else {
            TableService.removeSelectedCompany(state, company.id)
        }

    }

}

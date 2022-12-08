import {createSlice} from "@reduxjs/toolkit";
import {StateTable} from '../type'
import tableReducers from './../reducers/reducers'

const stateTable: StateTable = {
    inputAddressCompany: '',
    inputFirstNameStaff: '',
    inputLastNameStaff: '',
    inputPositionStaff: '',
    inputTitleCompany: '',
    company: [],
    staffTable: [],
    selectedCompany: [],
    selectedStaff: [],
    openEdit: []
}
const tablesSlice = createSlice({
    name: 'tables',
    initialState: stateTable,
    reducers: tableReducers

})
export const {
    addCompany,
    addStaff,
    deleteCompany,
    deleteStaff,
    openEditorCompany,
    openEditorStaff,
    changeSelectedCompany,
    changeSelectedStaff,
    changeInputCompany,
    changeInputStaff,
    initState
} = tablesSlice.actions
export default tablesSlice.reducer

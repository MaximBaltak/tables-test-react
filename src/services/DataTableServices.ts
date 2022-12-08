import {Company, Staff, StateTable} from "../store/type";
import {EditableInputs} from "../enums/editableInputs";

class dataTableService {
    private saveStaffTable(data: StateTable, isDeletedRecords: boolean) {
        data.staffTable = []
        data.selectedCompany.forEach(company => {
            this.updateStaffTable(data, company.id, isDeletedRecords)
        })
    }

    public initStateTable(state: StateTable, data: Company[]) {
        data.forEach(company => {
            company.isCheck = false
            company.isEdit = false
            company.staff.forEach(staff => {
                staff.isEdit = false
                staff.isCheck = false
            })
        })
        state.company = [...data]
    }

    public getCompany(data: Company[], id: number): Company | undefined {

        return data.find((company) => company.id === id)
    }


    public addCompany(data: Company[], company: Company) {
        data.push(company)
    }

    public saveCompany(data: Company[], text: string, id: number, input: EditableInputs) {
        const company: Company = data.find(company => company.id === id) as Company
        switch (input) {
            case EditableInputs.titleCompany:
                company.title = text
                break
            case EditableInputs.addressCompany:

                company.address = text
                break
            default:
                break
        }
    }

    public deleteCompany(data: StateTable) {
        data.selectedCompany.forEach((company) => {
            data.company.forEach((el, i) => {
                if (company.id === el.id) {
                    data.company.splice(i, 1)
                }
            })
        })
        this.saveStaffTable(data, true)
        data.selectedCompany = []
    }

    public getStaff(data: Company[], id: number, id_company: number): Staff | undefined {
        const company: Company | undefined = data.find((company) => id_company === company.id)
        if (company)
            return company.staff.find((staff) => staff.id === id)

    }

    public addStaff(data: StateTable, staff: Staff, id_company: number) {
        data.company.forEach((company) => {
            if (id_company === company.id) {
                company.staff.push(staff)
            }
        })
        this.saveStaffTable(data, false)
    }

    public deleteStaff(data: StateTable) {
        data.selectedStaff.forEach((staff) => {
            data.company.forEach((company) => {
                company.staff.forEach((el, i) => {
                    if (staff.id === el.id) {
                        company.staff.splice(i, 1)
                    }
                })
            })
        })
        this.saveStaffTable(data, true)
        data.selectedCompany.forEach(company => {
            this.updateStaffTable(data, company.id, false)
        })
        data.selectedStaff = []
    }

    public saveStaff(data: StateTable, text: string, id: number, id_company: number, input: EditableInputs) {
        const company: Company = data.company.find((company) => company.id === id_company) as Company
        const staff: Staff = company.staff.find((staff) => staff.id === id) as Staff
        switch (input) {
            case EditableInputs.firstNameStaff:
                staff.firstName = text
                break
            case EditableInputs.lastNameStaff:
                staff.lastName = text
                break
            case EditableInputs.positionStaff:
                staff.position = text
                break
            case EditableInputs.idCompanyStaff:
                staff.id_company = +text
                break
            default:
                break
        }
        this.saveStaffTable(data, false)
    }

    public closeEditorCompany(data: Company[], id: number) {
        const company: Company | undefined = data.find(company => company.id === id)
        if (company) company.isEdit = false
    }

    public closeEditorStaff(data: Company[], id: number, id_company: number) {
        const company: Company = data.find(company => company.id === id_company) as Company
        const staff: Staff = company.staff.find(staff => staff.id === id) as Staff
        staff.isEdit = false
        if (!staff.id_company) staff.id_company = company.id
    }


    public openEditorCompany(data: Company[], id: number) {
        data.forEach((company) => {
            if (company.id === id) {
                if (company.isEdit) {
                    this.closeEditorCompany(data, id)
                } else {
                    company.isEdit = true
                }
            }
        })
    }

    public openEditorStaff(data: StateTable, id: number, id_company: number) {
        data.company.forEach((company) => {
            if (id_company === company.id) {
                company.staff.forEach((staff) => {
                    if (staff.id === id) {
                        if (staff.isEdit) {
                            this.closeEditorStaff(data.company, staff.id, staff.id_company)
                        } else {
                            staff.isEdit = true
                        }
                    }

                })
            }
        })
        this.saveStaffTable(data, false)
    }

    public updateStaffTable(state: StateTable, id_company: number, isRemove: boolean) {
        if (!isRemove) {
            state.company.forEach((company) => {
                if (company.id === id_company) {
                    state.staffTable = [...state.staffTable, ...company.staff]
                }
            })
        } else {
            state.staffTable.forEach((staff, i) => {
                if (staff.id_company === id_company) {
                    state.staffTable.splice(i, 1)
                }
            })
        }
    }

    public addSelectedStaff(data: StateTable, staff: Staff) {
        data.selectedStaff.push(staff)
        const stateStaff: Staff | undefined = this.getStaff(data.company, staff.id, staff.id_company)
        if (stateStaff) {
            stateStaff.isCheck = true
            data.staffTable = []
            data.selectedCompany.forEach(company => {
                this.updateStaffTable(data, company.id, false)
            })
        }
    }

    public removeSelectedStaff(data: StateTable, id: number) {
        data.selectedStaff.forEach((staff, i) => {
            if (id === staff.id) {
                data.selectedStaff.splice(i, 1)
                const stateStaff: Staff | undefined = this.getStaff(data.company, staff.id, staff.id_company)
                if (stateStaff) {
                    stateStaff.isCheck = false
                    data.staffTable = []
                    data.selectedCompany.forEach(company => {
                        this.updateStaffTable(data, company.id, false)
                    })
                }
            }
        })
    }

    public addSelectedCompany(data: StateTable, company: Company) {
        data.selectedCompany.push(company)
        const stateCompany: Company | undefined = this.getCompany(data.company, company.id)
        data.staffTable = [...data.staffTable, ...company.staff]
        if (stateCompany) stateCompany.isCheck = true
    }

    public removeSelectedCompany(data: StateTable, id: number) {
        data.selectedCompany.forEach((company, i) => {
            if (id === company.id) {
                data.selectedCompany.splice(i, 1)
                const stateCompany: Company | undefined = this.getCompany(data.company, company.id)
                company.staff.forEach((staff) => {
                    this.updateStaffTable(data, staff.id_company, true)
                })
                if (stateCompany) stateCompany.isCheck = false
                if (data.selectedCompany.length == 0) data.staffTable = []
            }
        })
    }
}

export default new dataTableService()

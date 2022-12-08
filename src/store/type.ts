export interface Staff {
    id: number,
    firstName: string,
    lastName: string,
    position: string,
    isCheck?: boolean,
    isEdit?: boolean,
    id_company: number
}
export interface Company {
    id: number,
    isCheck?: boolean,
    title: string,
    staff: Staff[],
    address: string
    isEdit?: boolean,
}
export interface EditCompany {
    title:string,
    address: string,
}
export interface EditStaff {
    firstName: string,
    lastName: string,
    position: string
}
export interface StateTable {
    company: Company[]
    selectedCompany: Company[]
    selectedStaff: Staff[]
    inputTitleCompany: string,
    inputAddressCompany: string,
    inputFirstNameStaff: string,
    inputLastNameStaff: string,
    inputPositionStaff: string,
    staffTable:Staff[]
    openEdit: number[]
}

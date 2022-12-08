import React, {useEffect} from 'react';
import './App.scss';
import CompanyTable from "./components/tables/CompanyTable/CompanyTable";
import StaffTable from "./components/tables/StaffTable/StaffTable";
import {initState} from "./store/slices/tablesSlice";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {Company} from "./store/type";
import {useAppSelector} from "./hooks/useAppSelector";
import Help from "./components/Help/Help";

function App() {
    const selectedCompany:Company[] = useAppSelector(state => state.tableReducer.selectedCompany)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(initState())
    },[])
  return (
    <div className='container'>
        <div className='grid'>
            <div className='company'><CompanyTable/></div>
            <div className='staff'>
                { selectedCompany.length > 0? <StaffTable/> : <Help/>}
            </div>
        </div>
    </div>
  );
}

export default App;

import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:"",
    },
    reducers:{
        // actions
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        },
        updateCompanyStatusInStore:(state, action) => {
            const { companyId, status } = action.payload;
            state.companies = state.companies.map((company) =>
                company._id === companyId ? { ...company, status } : company
            );
            if (state.singleCompany && state.singleCompany._id === companyId) {
                state.singleCompany = { ...state.singleCompany, status };
            }
        },
        deleteCompanyFromStore:(state, action) => {
            const companyId = action.payload;
            state.companies = state.companies.filter((company) => company._id !== companyId);
            if (state.singleCompany && state.singleCompany._id === companyId) {
                state.singleCompany = null;
            }
        }
    }
});
export const {setSingleCompany, setCompanies,setSearchCompanyByText, updateCompanyStatusInStore, deleteCompanyFromStore} = companySlice.actions;
export default companySlice.reducer;
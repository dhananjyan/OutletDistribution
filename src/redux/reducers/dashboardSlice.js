import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        filters: {},
        filterOptions: {
            districts: [],
            state: [],
            locationType: [],
            populationBracket: [],
            financialYear: []
        },
        currentSelect: null,
        tableData: {},
        loading: {
            unCovered: false,
            covered: false
        },
        isLoading: false,
        isOutletSummaryTotalOutletLoading: false,
        counts: {
            totalVillage: 0,
            ckCoveredVillage: 0,
            ckUncoveredVillage: 0,
            villageCoverage: 0,
            ckCountOfCity: 0,
            totalOutletInCk: 0
        },
        ssfa: {
            cityCount: 0,
            coveredVillage: 0,
            outletCount: 0,
            billing: 0
        },
        rsc: {
            cityCount: 0,
            coveredVillage: 0,
            outletCount: 0,
            billing: 0
        },
        outlet: {
            currentOutletTab: "outletSummary",
        }
    },
    reducers: {
        updateFilterOptions: (state, action) => {
            state.filterOptions = {
                ...state.filterOptions,
                ...action.payload
            }
        },
        updateDistrictValues: (state, action) => {
            state.filterOptions.districts = [
                ...state.filterOptions.districts,
                { ...action.payload }
            ]
        },
        updateFilters: (state, action) => {
            state.filters = {
                ...state.filters,
                [action.payload.field]: action?.payload?.value
            }
        },
        updateOutletCurrentTab: (state, action) => {
            state.outlet.currentOutletTab = action.payload;
        },
        updateLoading: (state, action) => {
            if (typeof action.payload === "boolean")
                state.isLoading = action.payload;
            else {
                state[action.payload.section] = action.payload.value;
            }
        },
        updateCounts: (state, action) => {
            state.counts = action.payload?.counts
            state.ssfa = action.payload?.ssfa
            state.rsc = action.payload?.rsc
        },
        updateOutletSummaryTable: (state, action) => {
            state.tableData = action?.payload;
        },
        updateCurrentSelect: (state, action) => {
            state.currentSelect = action?.payload;
        },
        updateSubTableLoading: (state, action) => {
            state.loading = {
                ...state.loading,
                ...action?.payload
            };
        }

    },
})

// Action creators are generated for each case reducer function
export const { updateFilters, updateOutletCurrentTab, updateLoading, updateCounts, updateFilterOptions, updateOutletSummaryTable, updateCurrentSelect, updateSubTableLoading } = dashboardSlice.actions

export default dashboardSlice.reducer
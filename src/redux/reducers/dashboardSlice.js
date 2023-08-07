import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        filters: {
            state: ["TAMILNADU"],
            financialYear: ["2023-24"]
        },
        filterOptions: {
            district: [
                {
                    label: 'Chennai',
                    value: 'Chennai'
                },
                {
                    label: 'Coimbatore',
                    value: 'Coimbatore'
                },
                {
                    label: 'Cuddalore',
                    value: 'Cuddalore'
                },
                {
                    label: 'Dharmapuri',
                    value: 'Dharmapuri'
                },
                {
                    label: 'Dindigul',
                    value: 'Dindigul'
                },
                {
                    label: 'Erode',
                    value: 'Erode'
                },
                {
                    label: 'Kallakkurichi',
                    value: 'Kallakkurichi'
                },
                {
                    label: 'Kanchipuram',
                    value: 'Kanchipuram'
                },
                {
                    label: 'Kanyakumari',
                    value: 'Kanyakumari'
                },
                {
                    label: 'Karur',
                    value: 'Karur'
                },
                {
                    label: 'Krishnagiri',
                    value: 'Krishnagiri'
                },
                {
                    label: 'Madurai',
                    value: 'Madurai'
                },
                {
                    label: 'Nagapatinam',
                    value: 'Nagapatinam'
                },
                {
                    label: 'Namakkal',
                    value: 'Namakkal'
                },
                {
                    label: 'Niligiris',
                    value: 'Niligiris'
                },
                {
                    label: 'Perambalur',
                    value: 'Perambalur'
                },
                {
                    label: 'Pondicherry',
                    value: 'Pondicherry'
                },
                {
                    label: 'Pudukottai',
                    value: 'Pudukottai'
                },
                {
                    label: 'Ramanathapuram',
                    value: 'Ramanathapuram'
                },
                {
                    label: 'Ranipet',
                    value: 'Ranipet'
                },
                {
                    label: 'Salem',
                    value: 'Salem'
                },
                {
                    label: 'Sivagangai',
                    value: 'Sivagangai'
                },
                {
                    label: 'Thanjavur',
                    value: 'Thanjavur'
                },
                {
                    label: 'Theni',
                    value: 'Theni'
                },
                {
                    label: 'Thiruvarur',
                    value: 'Thiruvarur'
                },
                {
                    label: 'Tiruchirapalli',
                    value: 'Tiruchirapalli'
                },
                {
                    label: 'Tirunelveli',
                    value: 'Tirunelveli'
                },
                {
                    label: 'Tiruppur',
                    value: 'Tiruppur'
                },
                {
                    label: 'Tiruvallur',
                    value: 'Tiruvallur'
                },
                {
                    label: 'Tiruvannamalai',
                    value: 'Tiruvannamalai'
                },
                {
                    label: 'Tuticorin',
                    value: 'Tuticorin'
                },
                {
                    label: 'Vellore',
                    value: 'Vellore'
                },
                {
                    label: 'Villupuram',
                    value: 'Villupuram'
                },
                {
                    label: 'Virudunagar',
                    value: 'Virudunagar'
                }
            ],
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
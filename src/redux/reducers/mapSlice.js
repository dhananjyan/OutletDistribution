import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        filters: {},
        filterOptions: {},
        isLoading: false,
        currentSelect: null,
        mapData: []
    },
    reducers: {
        updateFilterOptions: (state, action) => {
            state.filterOptions = {
                ...state.filterOptions,
                ...action.payload
            }
        },
        updateFilters: (state, action) => {
            state.filters = {
                ...state.filters,
                [action.payload.field]: action?.payload?.value
            }
        },
        updateLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateCurrentSelect: (state, action) => {
            state.currentSelect = action?.payload;
        },
        updateMapData: (state, action) => {
            state.mapData = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateFilters, updateLoading, updateFilterOptions, updateCurrentSelect, updateMapData } = mapSlice.actions;

export default mapSlice.reducer
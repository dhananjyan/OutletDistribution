import { client } from "../../utils/client";
import { updateCounts, updateCurrentSelect, updateFilterOptions, updateFilters, updateLoading, updateOutletSummaryTable, updateSubTableLoading } from "../reducers/dashboardSlice"
import { updateFilterOptions as updateMapFilterOptions } from "../reducers/mapSlice";
import { updateLoading as updateMapSectionLoading } from "../reducers/mapSlice"
import { toastr } from 'react-redux-toastr'

export function applyFilter(isSkipValidation) {
    return async function fetchTodoByIdThunk(dispatch, getState) {
        const filters = getState()?.dashboard?.filters;
        const currentSelect = getState()?.dashboard?.currentSelect;
        // console.log("currentSelectcurrentSelect", currentSelect)
        // console.table({
        //     currentSelect,
        //     inStore: JSON.stringify(currentSelect?.initialValue),
        //     CurrentValue: JSON.stringify(filters?.[currentSelect?.selecteField]),
        //     isUPdate: JSON.stringify(currentSelect?.initialValue) != JSON.stringify(filters?.[currentSelect?.selecteField])
        // })
        if (!isSkipValidation)
            if (JSON.stringify(currentSelect?.initialValue) == JSON.stringify(filters?.[currentSelect?.selecteField])) {

                updateCurrentSelect(null);
                // console.log("ssssssssssssssssssss")
                return;
            }
        if (currentSelect?.selecteField == "state")
            dispatch(updateDistrictOptions(filters?.state))
        dispatch(updateLoading(true));
        dispatch(fetchOutletSummary());
        const result = await client.post("/get", {
            "state": filters?.state || [],
            "district": filters?.district || [],
            "urbanOrRural": filters?.locationType || [],
            "population": filters?.populationBracket || [],
            "financialYear": filters?.financialYear || []
        });

        dispatch(updateCounts({
            counts: {
                totalVillage: result?.data?.ALL?.[0]?.totalVillage || 0,
                ckCoveredVillage: result?.data?.ALL?.[0]?.coveredVillageTotal || 0,
                ckUncoveredVillage: result?.data?.ALL?.[0]?.uncoveredVillageTotal || 0,
                villageCoverage: result?.data?.ALL?.[0]?.villageCoveragePercentage || 0,
                ckCountOfCity: result?.data?.ALL?.[0]?.cityCount || 0,
                totalOutletInCk: result?.data?.ALL?.[0]?.totalOutlets || 0
            },
            ssfa: {
                cityCount: result?.data?.RSC?.RSC_City_Count || 0,
                coveredVillage: result?.data?.RSC?.RSC_Covered_Village || 0,
                outletCount: result?.data?.RSC?.RSC_Outlet_Count || 0,
                billing: result?.data?.RSC?.RSC_Billing_Percentage
            },
            rsc: {
                cityCount: result?.data?.SSFA?.SSFA_City_Count || 0,
                coveredVillage: result?.data?.SSFA?.SSFA_Covered_Village || 0,
                outletCount: result?.data?.SSFA?.SSFA_Outlet_Count || 0,
                billing: result?.data?.SSFA?.SSFA_Billing_Percentage || 0
            },
        }))

        if (!result?.status)
            toastr.error('Something went wrong, Please try again later')
        dispatch(updateLoading(false));
    }
}

export function getFilterOptions() {
    return async (dispatch, getState) => {
        dispatch(updateLoading(true));
        const result = await client.get("/filters");
        if (!result?.status)
            return toastr.error('Something went wrong, Please try again later')

        let state = result?.data?.State?.map(item => ({
            label: item?.state_name,
            value: item?.state_name,
            ...item
        }));

        let financialYear = result?.data?.FinYr?.map(item => ({
            label: item,
            value: item,
            ...item
        }));

        let locationType = result?.data?.Market?.map(item => ({
            label: item,
            value: item,
            ...item
        }));

        let population = result?.data?.Population?.map(item => ({
            label: item,
            value: item,
            ...item
        }));

        dispatch(updateFilterOptions({ state, financialYear, locationType, population }));
        dispatch(updateMapFilterOptions({ state }))
        // console.log('result', result)
        dispatch(updateLoading(false));
    }
}

export function updateDistrictOptions(state) {
    return async (dispatch, getState) => {
        // dispatch(updateLoading(true));
        dispatch(updateFilters({
            field: "district",
            value: []
        }));
        const result = await client.post("/district", { state });
        if (!result?.status)
            return toastr.error('Something went wrong, Please try again later')

        let district = result?.data?.map(item => ({
            label: item?.district_name,
            value: item?.district_name
        }))
        dispatch(updateFilterOptions({ district }))
    }
}


export function fetchOutletSummary() {
    return async (dispatch, getState) => {
        dispatch(updateLoading({
            section: "isOutletSummaryTotalOutletLoading",
            value: true
        }));
        const filters = getState()?.dashboard?.filters;
        dispatch(updateMapSectionLoading(true));
        const result = await client.post("/totalOutlet", {
            "state": filters?.state || [],
            "district": filters?.district || [],
            "urbanOrRural": filters?.locationType || [],
            "population": filters?.populationBracket || [],
            "financialYear": filters?.financialYear || []
        });
        if (!result?.status)
            return toastr.error('Something went wrong, Please try again later')
        // console.log("result", result?.data)
        if (result?.data) {
            // const formattedData = result?.data?.data?.map(item => ({
            //     State: item?.StateName,
            //     "Total Outlet Count": item?.Statetotal,
            //     children: item?.district?.length ? item?.district?.map(item => ({
            //         State: item?.DistrictName,
            //         "Total Outlet Count": item?.DistrictTotal,
            //         children: item?.village?.length ? item?.village?.map(item => ({
            //             State: item?.name,
            //             "Total Outlet Count": item?.totalOutlet,
            //         })) : []
            //     })) : []
            // }));
            dispatch(updateOutletSummaryTable(result?.data))
        }

        dispatch(updateLoading({
            section: "isOutletSummaryTotalOutletLoading",
            value: false
        }));

        // dispatch(updateFilterOptions({ state, financialYear, locationType, population }))
        // console.log('result', result)
        // dispatch(updateLoading(false));
    }
}

export function handleColumnSelect({ key, table }) {
    return async (dispatch, getState) => {
        const filters = getState()?.dashboard?.filters;
        dispatch(updateSubTableLoading({
            key: true
        }));
        {

            const tableData = getState()?.dashboard?.tableData;
            if (tableData?.["sub_" + table]?.key === key) {
                console.log("Selecting same data")
                return;
            }
            dispatch(updateOutletSummaryTable({ ...tableData, ["sub_" + table]: { data: [], key } }))
        }
        dispatch(updateFilters({
            field: table,
            value: key
        }));
        const result = await client.post(`/${table}`, { state: filters?.state || [], population: [key] });

        dispatch(updateSubTableLoading({
            key: false
        }));
        const tableData = getState()?.dashboard?.tableData;
        if (!result?.status) {

            dispatch(updateOutletSummaryTable({ ...tableData, ["sub_" + table]: null }))
            return toastr.error('Something went wrong, Please try again later')
        }

        dispatch(updateOutletSummaryTable({ ...tableData, ["sub_" + table]: { data: result?.data, key } }))
    }
}
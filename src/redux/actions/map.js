import { toastr } from "react-redux-toastr";
import { client } from "../../utils/client";
import { updateCountLoading, updateCurrentSelect, updateFilterOptions, updateFilters, updateLoading, updateMapData, updateShowMap } from "../reducers/mapSlice";

export function updateFilterValue(data) {
    return async (dispatch, getState) => {
        const filters = getState()?.map?.filters;
        if (data?.value?.[0] == filters?.[data?.field]?.[0]) {
            // dispatch(updateCurrentSelect(null));
            return;
        }
        dispatch(updateFilters(data))
        if (data?.field == "state")
            dispatch(updateDistrictOptions(data?.value))
        if (data?.field == "district")
            dispatch(updateVillageOptions({ district: data?.value, state: filters?.state }))

        dispatch(updateCurrentSelect(null));
    }
}



export function updateVillageOptions({ state, district }) {
    return async (dispatch, getState) => {
        dispatch(updateFilters({
            field: "village",
            value: []
        }));
        dispatch(updateFilterOptions({ village: [] }));
        if (!state?.length || !district?.length) return;

        dispatch(onUpdateDistrict());
        const result = await client.post("/village", {
            "state": state[0],
            "district": district[0]
        });
        if (!result?.status)
            return toastr.error('Something went wrong, Please try again later')

        let village = result?.data?.map(item => ({
            label: item?.village_name,
            value: item?.village_name
        }))
        dispatch(updateFilterOptions({ village }))
    }
}



export function updateDistrictOptions(state) {
    return async (dispatch, getState) => {
        dispatch(updateFilters({
            field: "district",
            value: []
        }));
        dispatch(updateFilters({
            field: "village",
            value: []
        }));
        dispatch(updateFilterOptions({ district: [], village: [] }))
        if (!state?.length) return;
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

export function onUpdateDistrict() {
    return async (dispatch, getState) => {
        const filters = getState()?.map?.filters;
        dispatch(updateShowMap(false))
        dispatch(updateCountLoading(true));
        const result = await client.post("/map",
            {
                "state": filters?.state?.[0] || "",
                "district": filters?.district?.[0] || "",
                "village": "",
            });
        dispatch(updateCountLoading(false));
        if (!result?.status)
            return toastr.error('Something went wrong, Please try again later')

        if (!result?.data?.[0]?.result?.length)
            return toastr.info("No record found")
        let { result: ddd, ...restData } = result?.data?.[0];
        dispatch(updateMapData([restData]))
    }
}

export function filterSubmit() {
    return async (dispatch, getState) => {
        const filters = getState()?.map?.filters;
        if (!filters?.state?.[0])
            return toastr.info("Please select State to continue")
        if (!filters?.district?.[0])
            return toastr.info("Please select District to continue")
        if (!filters?.village?.[0])
            return toastr.info("Please select village to continue");

        dispatch(updateShowMap(true))

        dispatch(updateLoading(true));
        const result = await client.post("/map",
            {
                "state": filters?.state?.[0] || "",
                "district": filters?.district?.[0] || "",
                "village": filters?.village?.[0] || "",
                // "state": "TAMILNADU",
                // "district": "Madurai",
                // "village": "Madurai",
            });
        dispatch(updateLoading(false));
        if (!result?.status)
            return toastr.error('Something went wrong, Please try again later')

        if (!result?.data?.[0]?.result?.length)
            return toastr.info("No record found")
        dispatch(updateMapData(result?.data))
    }
}

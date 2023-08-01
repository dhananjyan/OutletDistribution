import { client } from "../../utils/client";
import { updateCurrentSelect, updateFilterOptions, updateFilters } from "../reducers/mapSlice";

export function updateFilterValue(data) {
    return async (dispatch, getState) => {
        const filters = getState()?.map?.filters;
        console.log('data', data?.value?.[0], filters?.[data?.field]?.[0])
        if (data?.value?.[0] == filters?.[data?.field]?.[0]) {
            // dispatch(updateCurrentSelect(null));
            return;
        }
        dispatch(updateFilters(data))
        if (data?.field == "state")
            dispatch(updateDistrictOptions(data?.value))

        dispatch(updateCurrentSelect(null));
    }
}



export function updateDistrictOptions(state) {
    return async (dispatch, getState) => {
        dispatch(updateFilters({
            field: "district",
            value: []
        }));
        dispatch(updateFilterOptions({ district: [] }))
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

export function filterSubmit() {
    return async (dispatch, getState) => {
        const filters = getState()?.map?.filters;
        const result = await client.post("/map", {
            "state": filters?.state?.[0] || "",
            "district": filters?.district?.[0] || "",
            "village": "Alandur"
        });
        if (!result?.status)
            return toastr.error('Something went wrong, Please try again later')

        dispatch(updateMapData(result?.data))
    }
}

import { toastr } from "react-redux-toastr";
import { client } from "../../utils/client";
import { updateCurrentSelect, updateFilterOptions, updateFilters, updateMapData } from "../reducers/mapSlice";

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
            dispatch(updateVillageOptions({ village: data?.value, state: filters?.state }))

        dispatch(updateCurrentSelect(null));
    }
}



export function updateVillageOptions({ state, village }) {
    return async (dispatch, getState) => {
        dispatch(updateFilters({
            field: "village",
            value: []
        }));
        dispatch(updateFilterOptions({ village: [] }));
        console.log('fffffffffffffff', state, village)
        return;
        if (!state?.length) return;
        const result = await client.post("/village", {
            "state": "TAMILNADU",
            "district": "Salem"
        });
        if (!result?.status)
            return toastr.error('Something went wrong, Please try again later')

        let district = result?.data?.map(item => ({
            label: item?.district_name,
            value: item?.district_name
        }))
        dispatch(updateFilterOptions({ district }))
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
        if (!filters?.state?.[0])
            return toastr.info("Please select State to continue")
        if (!filters?.district?.[0])
            return toastr.info("Please select District to continue")
        if (!filters?.village?.[0])
            return toastr.info("Please select village to continue")

        const result = await client.post("/map",
            {
                "state": filters?.state?.[0] || "",
                "district": filters?.district?.[0] || "",
                "village": filters?.village?.[0] || "",
            });
        console.log("rrr", result)
        if (!result?.status)
            return toastr.error('Something went wrong, Please try again later')
        dispatch(updateMapData(result?.data))
    }
}

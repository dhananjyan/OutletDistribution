import { useDispatch, useSelector } from 'react-redux';

import s from "./style.module.scss";

import SelectBox from "../../../SelectBox/SelectBox";

import { updateCurrentSelect, updateFilters } from "../../../../redux/reducers/dashboardSlice";
import { applyFilter, updateDistrictOptions } from '../../../../redux/actions/dashboard';
import debounce from 'lodash.debounce';
import { locationTypeOption } from '../../../../helpers/constant';
import { useState } from 'react';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export default function Filters() {
    const dispatch = useDispatch();
    // const [currentData, setCurrentData] = useState(null);
    // const [currentSelect, setCurrentSelect] = useState(() => {
    //     console.log('Initializing the current select')
    //     return {};
    // });
    const filtersValue = useSelector(state => state?.dashboard?.filters);
    const filterOptions = useSelector(state => state?.dashboard?.filterOptions);
    // const currentSelect = useSelector(state => state?.dashboard?.currentSelect);
    // console.log("currentSelect", currentSelect)
    function handleFilterChange(data) {
        // console.table({
        //     inStore: JSON.stringify(filtersValue?.[data?.field]),
        //     CurrentValue: JSON.stringify(data?.value),
        //     isUPdate: JSON.stringify(filtersValue?.[data?.field]) !== JSON.stringify(data?.value)
        // })
        if (JSON.stringify(filtersValue?.[data?.field]) !== JSON.stringify(data?.value)) {
            // setIsUpadted(true);
            // if (data?.field === "state") {
            //     dispatch(updateDistrictOptions(data?.value))
            // }
            dispatch(updateFilters(data));
            // dispatch(applyFilter());
        } else {
            // console.log('is update false');

            // setIsUpadted(false);
        }
    }

    function handleClose() {
        dispatch(applyFilter());
        // console.log('close handle', currentSelect)
        // if (currentSelect?.selecteField) {
        //     console.table({
        //         inStore: JSON.stringify(currentSelect?.initialValue),
        //         CurrentValue: JSON.stringify(filtersValue?.[currentSelect?.selecteField]),
        //         isUPdate: JSON.stringify(currentSelect?.initialValue) != JSON.stringify(filtersValue?.[currentSelect?.selecteField])
        //     })
        //     if (JSON.stringify(currentSelect?.initialValue) !== JSON.stringify(filtersValue?.[currentSelect?.selecteField]))
        //         alert("api hit")
        // } else {

        //     // setCurrentSelect({});
        // }
        // console.log("finished close")
    }

    function handleOpen(key) {
        // console.log('handle Open');
        dispatch(updateCurrentSelect({
            selecteField: key,
            initialValue: filtersValue?.[key]
        }))
        // setCurrentData({
        //     selecteField: key,
        //     initialValue: filtersValue?.[key]
        // })
        // setCurrentSelect({
        //     selecteField: key,
        //     initialValue: filtersValue?.[key]
        // })
    }

    const debouncedOnChange = debounce(handleFilterChange, 300);

    return (
        <div className={s.filterContainer}>
            <div className={s.filterItem}>
                <label>State</label>
                <SelectBox onClose={() => handleClose()} onOpen={() => handleOpen("state")} isMultiSelect options={filterOptions?.state || []} name="state" value={filtersValue?.state} onChange={debouncedOnChange} />
            </div>
            <div className={s.filterItem}>
                <label>District</label>
                <SelectBox onClose={() => handleClose()} onOpen={() => handleOpen("district")} isMultiSelect options={filterOptions?.district} name="district" value={filtersValue?.district} onChange={debouncedOnChange} />
            </div>
            <div className={s.filterItem}>
                <label>Urban / Rural</label>
                <SelectBox onClose={() => handleClose()} onOpen={() => handleOpen("locationType")} isMultiSelect options={filterOptions?.locationType || []} name="locationType" value={filtersValue?.locationType} onChange={debouncedOnChange} />
            </div>
            <div className={s.filterItem}>
                <label>Population Bracket</label>
                <SelectBox onClose={() => handleClose()} onOpen={() => handleOpen("populationBracket")} isMultiSelect options={filterOptions?.population || []} name="populationBracket" value={filtersValue?.populationBracket} onChange={debouncedOnChange} />
            </div>
            <div className={s.filterItem}>
                <label>Financial Year</label>
                <SelectBox onClose={() => handleClose()} onOpen={() => handleOpen("financialYear")} isMultiSelect options={filterOptions?.financialYear || []} name="financialYear" value={filtersValue?.financialYear} onChange={debouncedOnChange} />
            </div>
        </div>
    )
}

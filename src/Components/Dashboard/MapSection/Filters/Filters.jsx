import { useDispatch, useSelector } from 'react-redux';

import cx from "classnames";
import { Button } from "react-bootstrap";
import s from "./style.module.scss";

import SelectBox from "../../../SelectBox/SelectBox";
import { updateCurrentSelect, updateFilters } from '../../../../redux/reducers/mapSlice';
import { filterSubmit, updateFilterValue } from '../../../../redux/actions/map';


export default function Filters() {
    const dispatch = useDispatch();
    const filterOptions = useSelector(state => state?.map?.filterOptions);
    const filtersValue = useSelector(state => state?.map?.filters);
    const currentSelect = useSelector(state => state?.map?.currentSelect);
    console.log("filtersValue", filtersValue)
    // console.log("filtersValuefiltersValuefiltersValue", filtersValue)
    async function handleFilterChange(data) {
        // await dispatch(updateFilters());
        dispatch(updateFilterValue(data));
    }

    function handleClose() {

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
    function handleSubmit() {
        dispatch(filterSubmit())
    }
    return (
        <div className={s.filterContainer}>
            <div className={s.filterItem}>
                <label>State</label>
                <SelectBox onClose={() => handleClose()} onOpen={() => handleOpen("state")} options={filterOptions?.state || []} name="state" value={filtersValue?.state} onChange={handleFilterChange} />
            </div>
            <div className={s.filterItem}>
                <label>District</label> 
                <SelectBox onClose={() => handleClose()} onOpen={() => handleOpen("district")} value={filtersValue?.district} options={filterOptions?.district || []} name="district" onChange={handleFilterChange} />
            </div>
            {/*<div className={s.filterItem}>
                <label>Village</label>
                <SelectBox options={options} name="name2" defaultValue={[]} onChange={handleFilterChange} />
            </div> */}
            <div className={cx("align-self-end")}>
                <Button className={s.filterButton} onClick={handleSubmit}>Submit</Button>
            </div>
            <div className={cx("align-self-end", s.noOfCounts)}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ width: 40 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="12" fill="#3771C3" fill-opacity="0.5" />
                                </svg>
                            </td>
                            <td>No. of Distributors</td>
                            <td>:</td>
                            <td style={{ width: 25, textAlign: "right" }}>0</td>
                        </tr>
                        <tr>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="12" fill="#3771C3" fill-opacity="0.2" />
                                </svg>
                            </td>
                            <td>No. of Outlets</td>
                            <td>:</td>
                            <td style={{ width: 25, textAlign: "right" }}>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

import { useDispatch, useSelector } from 'react-redux';

import cx from "classnames";
import { Button } from "react-bootstrap";
import s from "./style.module.scss";

import SelectBox from "../../../SelectBox/SelectBox";
import { updateCurrentSelect, updateFilters } from '../../../../redux/reducers/mapSlice';
import { filterSubmit, updateFilterValue } from '../../../../redux/actions/map';

import distributorMarker from "../../../../assets/distributorMarker.png";
import outletMarker from "../../../../assets/outletMarker.png";
import DotLoader from '../../../DotLoader/DotLoader';
import Loader from '../../../Loader/Loader';

export default function Filters(props) {
    const { distributorCount, outletCount } = props;
    const dispatch = useDispatch();
    const filterOptions = useSelector(state => state?.map?.filterOptions);
    const filtersValue = useSelector(state => state?.map?.filters);
    const isLoading = useSelector(state => state?.map?.isCountLoading);
    async function handleFilterChange(data) {
        dispatch(updateFilterValue(data));
    }

    function handleClose() {

    }

    function handleOpen(key) {
        dispatch(updateCurrentSelect({
            selecteField: key,
            initialValue: filtersValue?.[key]
        }))
    }
    function handleSubmit() {
        dispatch(filterSubmit())
    }
    return (
        <div className={s.filterContainer}>
            <div className={s.filterItem}>
                <label>State</label>
                <SelectBox zIndex="99999" onClose={() => handleClose()} onOpen={() => handleOpen("state")} options={filterOptions?.state || []} name="state" value={filtersValue?.state} onChange={handleFilterChange} />
            </div>
            <div className={s.filterItem}>
                <label>District</label>
                <SelectBox zIndex="99999" onClose={() => handleClose()} onOpen={() => handleOpen("district")} value={filtersValue?.district} options={filterOptions?.district || []} name="district" onChange={handleFilterChange} />
            </div>
            <div className={s.filterItem}>
                <label>Village</label>
                <SelectBox zIndex="99999" options={filterOptions?.village || []} name="village" value={filtersValue?.village} onClose={() => handleClose()} onOpen={() => handleOpen("village")} defaultValue={[]} onChange={handleFilterChange} />
            </div>
            <div className={cx("align-self-end")}>
                <Button className={s.filterButton} onClick={handleSubmit}>Submit</Button>
            </div>
            <div className={cx("align-self-end", s.noOfCounts)}>
                <Loader show={isLoading}>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ width: 40 }}>
                                    <img src={distributorMarker} />
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="12" fill="#3771C3" fill-opacity="0.5" />
                                </svg> */}
                                </td>
                                <td>No. of Distributors</td>
                                <td>:</td>
                                <td style={{ width: 25, textAlign: "right" }}>{distributorCount}</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={outletMarker} />
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="12" fill="#3771C3" fill-opacity="0.2" />
                                </svg> */}
                                </td>
                                <td>No. of Outlets</td>
                                <td>:</td>
                                <td style={{ width: 25, textAlign: "right" }}>{outletCount}</td>
                            </tr>
                        </tbody>
                    </table>
                </Loader>
            </div>
        </div>
    )
}

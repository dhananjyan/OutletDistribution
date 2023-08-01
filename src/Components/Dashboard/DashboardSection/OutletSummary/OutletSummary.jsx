import cx from "classnames";
import s from "./style.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { updateOutletCurrentTab, updateOutletSummaryTable } from "../../../../redux/reducers/dashboardSlice";
import OutletSummaryDetails from "./OutletSummaryDetails/OutletSummaryDetails";
import UncoveredVillageCountDetails from "./UncoveredVillageCountDetails/UncoveredVillageCountDetails";
import CoveredVillageCount from "./CoveredVillageCount/CoveredVillageCount";
import DotLoader from "../../../DotLoader/DotLoader";

export default function OutletSummary() {
    const dispatch = useDispatch();

    const currentTab = useSelector(state => state?.dashboard?.outlet?.currentOutletTab);
    const isOutletSummaryTotalOutletLoading = useSelector(state => state?.dashboard?.isOutletSummaryTotalOutletLoading);


    const tableData = useSelector(state => state?.dashboard?.tableData);
    const handleTabClick = (tab) => {
        dispatch(updateOutletCurrentTab(tab))
        dispatch(updateOutletSummaryTable({ ...tableData, sub_coveredVillages: null }))
    }

    return (
        <div>
            <div className={s.tabularSummaryContainer}>
                <div className={s.tabSection}>
                    <div className={cx(s.tab, { [s.active]: currentTab === "outletSummary" })} role="button" onClick={() => handleTabClick("outletSummary")}>Outlet Summary</div>
                    <div className={cx(s.tab, { [s.active]: currentTab === "allVillageCount" })} role="button" onClick={() => handleTabClick("allVillageCount")}>Covered / Uncovered Village Count</div>
                    <div className={cx(s.tab, { [s.active]: currentTab === "coveredVillageCount" })} role="button" onClick={() => handleTabClick("coveredVillageCount")}>Covered Village Count</div>
                </div>
                <div>
                    <DotLoader show={isOutletSummaryTotalOutletLoading}>
                        {currentTab === "outletSummary" ? <OutletSummaryDetails /> : (currentTab === "allVillageCount") ? <UncoveredVillageCountDetails /> : <CoveredVillageCount />}
                    </DotLoader>
                </div>
            </div>
        </div>
    )
}

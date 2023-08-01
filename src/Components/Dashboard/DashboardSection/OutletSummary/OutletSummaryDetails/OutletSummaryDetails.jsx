import Table from "../../../../Table/Table";

import cx from "classnames";
import s from './style.module.scss';
import { useSelector } from "react-redux";

export default function OutletSummaryDetails() {

    const tableData = useSelector(state => state?.dashboard?.tableData);

    return (
        <div className={s.summaryContainer}>
            <div className={s.item}>
                <div className={cx("text-center", s.tableLabel)}>Total Outlet Count - CSNG </div>
                <Table data={tableData?.totalOutletSummary} />
            </div>
            <div className={s.item}>
                <div className={cx("text-center", s.tableLabel)}>SSFA JC Wise Outlet Count</div>
                <Table data={tableData?.ssfaOutletSummary} />
            </div>
            <div className={s.item}>
                <div className={cx("text-center", s.tableLabel)}>RSC JC Wise Outlet Count</div>
                <Table data={tableData?.rscOutletSummary} />
            </div>
        </div>
    )
}

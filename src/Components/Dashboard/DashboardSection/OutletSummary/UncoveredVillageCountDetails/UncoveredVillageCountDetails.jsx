import Table from "../../../../Table/Table";

import cx from "classnames";
import s from './style.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { handleColumnSelect } from "../../../../../redux/actions/dashboard";
import DotLoader from "../../../../DotLoader/DotLoader";

export default function UncoveredVillageCountDetails() {

    const dispatch = useDispatch();

    const tableData = useSelector(state => state?.dashboard?.tableData);

    function handleSelect({ key, table }) {
        dispatch(handleColumnSelect({ key, table }))
    }
    return (
        <div className={s.summaryContainer}>
            <div className={s.item}>
                <DotLoader show={tableData?.sub_uncoveredVillages?.key && !tableData?.sub_uncoveredVillages?.data?.length}>
                    <div className={cx("text-center", s.tableLabel)}>CK Uncovered Villages Count by state and Population</div>
                    <Table isColumnSelectable selectedKey={tableData?.sub_uncoveredVillages?.key} onColumnSelect={key => handleSelect({ key, table: "uncoveredVillages" })} data={tableData?.uncoveredVillages} />
                    {tableData?.sub_uncoveredVillages ? <><div className={cx("text-center", s.tableLabel)}>CK Uncovered Villages by state and Population</div>
                        <Table data={tableData?.sub_uncoveredVillages?.data} hasFooter={false} /></> : ""}
                </DotLoader>
            </div>
            <div className={s.item}>
                <DotLoader show={tableData?.sub_coveredVillages?.key && !tableData?.sub_coveredVillages?.data?.length}>
                    <div className={cx("text-center", s.tableLabel)}>CK Covered Villages by state and Population</div>
                    <Table isColumnSelectable selectedKey={tableData?.sub_coveredVillages?.key} onColumnSelect={key => handleSelect({ key, table: "coveredVillages" })} data={tableData?.coveredVillages} />
                    {tableData?.sub_coveredVillages ? <><div className={cx("text-center", s.tableLabel)}>CK Uncovered Villages by state and Population</div>
                        <Table data={tableData?.sub_coveredVillages?.data} hasFooter={false} /></> : ""}
                </DotLoader>
            </div>
        </div>
    )
}

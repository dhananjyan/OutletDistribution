import Table from "../../../../Table/Table";

import cx from "classnames";
import s from './style.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { handleColumnSelect } from "../../../../../redux/actions/dashboard";
import DotLoader from "../../../../DotLoader/DotLoader";

export default function CoveredVillageCount() {

    const dispatch = useDispatch();

    const tableData = useSelector(state => state?.dashboard?.tableData);

    function handleSelect({ key, table }) {
        dispatch(handleColumnSelect({ key, table }))
    }
    return (
        <div className={s.summaryContainer}>
            <div className={s.item}>
                <DotLoader show={ tableData?.sub_coveredVillages?.key && !tableData?.sub_coveredVillages?.data?.length}>
                    <div className={cx("text-center", s.tableLabel)}>CK Covered Villages by state and Population</div>
                    <Table isColumnSelectable selectedKey={tableData?.sub_coveredVillages?.key} onColumnSelect={key => handleSelect({ key, table: "coveredVillages" })} data={tableData?.coveredVillages} />
                    <div>{tableData?.sub_coveredVillages ? <><div className={cx("text-center", s.tableLabel)}>CK Uncovered Villages by state and Population</div>
                        <Table data={tableData?.sub_coveredVillages?.data} hasFooter={false} /></> : ""}</div>
                </DotLoader>
            </div>
            <div className={s.item}>
                <div className={cx("text-center", s.tableLabel)}>SSFA JC Wise Coverd Villages</div>
                <Table data={tableData?.ssfaCoveredVillage} />

            </div>
            <div className={s.item}>
                <div className={cx("text-center", s.tableLabel)}>RSC JC Wise Coverd Villages</div>
                <Table data={tableData?.rscCoveredVillage} />

            </div>
        </div>
    )
}

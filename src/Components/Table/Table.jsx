import s from "./style.module.scss";

import Row from "./Row/Row";

import cx from "classnames";

// find the header columns
function getColumnList({ data, hasFooter }) {
    if (data[0]) {
        let result = Object.keys(data[0])?.filter(item => item !== "children");
        let foot = Object.keys(data[data?.length - 1])?.filter(item => item !== "children");
        if (!result?.[0]?.includes("tate")) {
            let lItem = foot.pop();
            foot.unshift(lItem)
            let lastItem = result.pop();
            result.unshift(lastItem);
        }
        return { columns: result, footColumns: foot };
    }
    return { columns: [], footColumns: [] };
}

function formatData({ data, hasFooter }) {
    if (!hasFooter) return { tableData: [...data], footerData: [] };
    let tableData = [...data];
    let footerData = tableData.pop();
    return { tableData, footerData };
}

export default function Table(props) {
    const { data = [], isColumnSelectable, onColumnSelect, hasFooter = true, selectedKey } = props;
    const { tableData = [], footerData = [] } = formatData({ data, hasFooter });
    const { columns, footColumns } = getColumnList({ data, hasFooter });

    function handleSelect(key) {
        if (typeof onColumnSelect == "function" && isColumnSelectable) {
            if (key?.includes("tate"))
                return;
            onColumnSelect(key);
        }
    }
    return (
        <div className={s.tableContainer}>
            <table>
                <thead>
                    <tr>
                        {columns.map((item, i) => {
                            console.table({
                                selectedKey,
                                item
                            })
                            return <th className={cx({ [s.active]: (selectedKey == item) })} style={(i == 0) ? { width: 200 } : { width: 80 }} role={isColumnSelectable ? "button" : "none"} onClick={() => handleSelect(item)} key={`HEADER_COLUMN_${i}`}>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((item, i) => <Row
                        item={item}
                        selectedKey={selectedKey}
                        keyValue={`ROW_ITEM_${item.state}_${i}`}
                        key={i}
                        level={1}
                        fields={columns}
                    />)}
                </tbody>
                {hasFooter ? <tfoot>
                    <tr>
                        {footColumns?.map(item => {
                            return <td className={cx({ "active": (selectedKey == item) })}>{footerData[item]}</td>
                        })}
                    </tr>
                </tfoot> : ""}
            </table>
        </div>
    )
}

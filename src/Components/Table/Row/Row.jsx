import { useState } from "react";

import cx from "classnames";
import s from "./style.module.scss";

import { ReactSVG } from 'react-svg'

import minusSvg from "../../../assets/svg/minus.svg";
import plusSvg from "../../../assets/svg/plus add.svg";


export default function Row(props) {
    const { item, keyValue, level, fields, selectedKey } = props;
    const [toggleStatus, setToggleStatus] = useState(false);
    function handleToggle() {
        setToggleStatus(v => !v);
    }
    const hasChildren = !!item?.children?.length
    return (<>
        <tr key={keyValue} className={cx({ "fw-bold": (level === 1) })}>
            {fields.map((key, i) => {
                if (i == 0)
                    return (<td key={`COLUMN_${key}_${i}`}>
                        <div className={cx("d-flex gap-3", s[`level-${level}`], "pt-1")}>
                            <div className={cx(s.toggleButton)} onClick={handleToggle}>
                                <ReactSVG src={(toggleStatus || !hasChildren) ? minusSvg : plusSvg} />
                            </div>
                            <div className={s.stateName}>{item[key]}</div>
                        </div>
                    </td>)
                return (<td className={cx({ "active": (selectedKey == key) })} key={`COLUMN_${key}_${i}`}>{item[key]}</td>);
            })}

        </tr>
        {(toggleStatus && hasChildren) ? item?.children?.map((item, i) => <Row item={item} key={i} keyValue={`ROW_ITEM_${item.state}_${i}`} level={+level + 1} fields={fields} />) : ""}
    </>)
}
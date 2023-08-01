import cx from "classnames";
import s from "./style.module.scss";

import { ReactSVG } from 'react-svg'

import dashboardSvg from "../../../assets//svg/darhboard_alt.svg";
import mapSvg from "../../../assets//svg/map-alt.svg";

export default function TabButtons(props) {

    const { currentTab, setCurrentTab } = props;

    function handleClick(tab) {
        setCurrentTab(tab)
    }

    return (
        <div className={s.buttonContainer}>
            <div role="button" className={cx(s.button, { [s.active]: currentTab === "dashboard" })} onClick={() => handleClick("dashboard")}>
                <ReactSVG src={dashboardSvg} />
                <div>Dashboard</div>
            </div>
            <div role="button" className={cx(s.button, { [s.active]: currentTab === "mapView" })} onClick={() => handleClick("mapView")}>
                <ReactSVG src={mapSvg} />
                <div>Map View</div>
            </div>
        </div>
    )
}

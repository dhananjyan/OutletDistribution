import { useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MapSection from "./MapSection/MapSection";
import TabButtons from "./TabButtons/TabButtons";
import DashboardSection from "./DashboardSection/DashboardSection";

import cx from "classnames";
import s from "./style.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { applyFilter, getFilterOptions } from "../../redux/actions/dashboard";


export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState("dashboard");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilterOptions())
    }, [])
    
    return (
        <div className={s.main}>
            <Header />
            <div className="container-fluid py-3 flex-grow-1">
                <div className={cx("d-flex justify-content-end my-3")}>
                    <TabButtons currentTab={currentTab} setCurrentTab={setCurrentTab} />
                </div>
                <div>
                    {currentTab === "dashboard" ? <DashboardSection /> : <MapSection />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

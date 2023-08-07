import { Suspense, lazy, useState } from "react";

// import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import MapSection from "./MapSection/MapSection";
// import TabButtons from "./TabButtons/TabButtons";
// import DashboardSection from "./DashboardSection/DashboardSection";
const DashboardSection = lazy(() => import("./DashboardSection/DashboardSection"));
const MapSection = lazy(() => import("./MapSection/MapSection"));
const TabButtons = lazy(() => import("./TabButtons/TabButtons"));
const Header = lazy(() => import("../Header/Header"));


import cx from "classnames";
import s from "./style.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { applyFilter, getFilterOptions } from "../../redux/actions/dashboard";
import DotLoader from "../DotLoader/DotLoader";


export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState("dashboard");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilterOptions())
    }, [])

    return (
        <div className={s.main}>
            <Suspense>
                <Header />
            </Suspense>
            <div className="container-fluid py-3 flex-grow-1">
                <div className={cx("d-flex justify-content-end my-3")}>
                    <Suspense>
                        <TabButtons currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    </Suspense>
                </div>
                <div>
                    <Suspense fallback={<DotLoader show />}>
                        {currentTab === "dashboard" ? <DashboardSection /> : <MapSection />}
                    </Suspense>
                </div>
            </div>
            <Footer />
        </div>
    )
}

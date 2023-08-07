import cx from "classnames";
import s from "./style.module.scss";

import Filters from "./Filters/Filters";
import OutletSummary from "./OutletSummary/OutletSummary";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import downloadSvg from "../../../assets/svg/download.svg";
import { ReactSVG } from 'react-svg'
import Loader from "../../Loader/Loader";
import { formatNumberWithTwoDecimals } from "../../../utils/helpers";
import { useEffect } from "react";
import { applyFilter } from "../../../redux/actions/dashboard";

export default function DashboardSection() {
    const dashboard = useSelector(state => state?.dashboard);
    const dispatch = useDispatch();
    const { counts, ssfa, rsc } = dashboard || {};

    useEffect(() => {
        dispatch(applyFilter(true))
    }, [])


    return (
        <div className={s.dashboardSection}>
            <Loader show={dashboard?.isLoading}>
                <Filters />
                <div className={cx("d-flex justify-content-between py-5 flex-wrap gap-4")}>
                    <div className={cx(s.countCard)} style={{ borderLeftColor: "#478399", color: "#478399" }}>
                        <div className={s.count}>{formatNumberWithTwoDecimals(counts?.totalVillage)}</div>
                        <div className={s.countLabel}>Total Villages</div>
                    </div>
                    <div className={cx(s.countCard)} style={{ borderLeftColor: "#587EDF", color: "#587EDF" }}>
                        <div className={s.count}>{formatNumberWithTwoDecimals(counts?.ckCoveredVillage)}</div>
                        <div className={s.countLabel}>CK covered Villages</div>
                    </div>
                    <div className={cx(s.countCard)} style={{ borderLeftColor: "#CC9487", color: "#CC9487" }}>
                        <div className={s.count}>{formatNumberWithTwoDecimals(counts?.ckUncoveredVillage)}</div>
                        <div className={s.countLabel}>CK Uncovered Villages</div>
                    </div>
                    <div className={cx(s.countCard)} style={{ borderLeftColor: "#478399", color: "#478399" }}>
                        <div className={s.count}>{formatNumberWithTwoDecimals(counts?.villageCoverage)}</div>
                        <div className={s.countLabel}>Village Coverage %</div>
                    </div>
                    <div className={cx(s.countCard)} style={{ borderLeftColor: "#587EDF", color: "#587EDF" }}>
                        <div className={s.count}>{formatNumberWithTwoDecimals(counts?.ckCountOfCity)}</div>
                        <div className={s.countLabel}>CK Count of City</div>
                    </div>
                    <div className={cx(s.countCard)} style={{ borderLeftColor: "#CC9487", color: "#CC9487" }}>
                        <div className={s.count}>{formatNumberWithTwoDecimals(counts?.totalOutletInCk)}</div>
                        <div className={s.countLabel}>Total Outlets in CK</div>
                    </div>
                </div>
                <div>
                    <div className={s.cardsContainer}>
                        <div className={s.cardBody}>
                            <div className={s.header}>
                                SSFA
                            </div>
                            <div className={s.countListSection}>
                                <div className={s.counterCard}>
                                    <div className={s.count}>{formatNumberWithTwoDecimals(rsc.cityCount)}</div>
                                    <div className={s.countLabel}>City Count</div>
                                </div>
                                <div className={s.counterCard}>
                                    <div className={s.count}>{formatNumberWithTwoDecimals(rsc.coveredVillage)}</div>
                                    <div className={s.countLabel}>Covered Villages</div>
                                </div>
                                <div className={s.counterCard}>
                                    <div className={s.count}>{formatNumberWithTwoDecimals(rsc.outletCount)}</div>
                                    <div className={s.countLabel}>Outlet Count</div>
                                </div>
                                <div className={s.counterCard}>
                                    <div className={s.count}>{formatNumberWithTwoDecimals(rsc.billing)} %</div>
                                    <div className={s.countLabel}>RSC Billing %</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.cardBody}>
                            <div className={s.header}>
                                RSC
                            </div>
                            <div className={s.countListSection}>
                                <div className={s.counterCard}>
                                    <div className={s.count}>{formatNumberWithTwoDecimals(ssfa.cityCount)}</div>
                                    <div className={s.countLabel}>City Count</div>
                                </div>
                                <div className={s.counterCard}>
                                    <div className={s.count}>{formatNumberWithTwoDecimals(ssfa.coveredVillage)}</div>
                                    <div className={s.countLabel}>Covered Villages</div>
                                </div>
                                <div className={s.counterCard}>
                                    <div className={s.count}>{formatNumberWithTwoDecimals(ssfa.outletCount)}</div>
                                    <div className={s.countLabel}>Outlet Count</div>
                                </div>
                                <div className={s.counterCard}>
                                    <div className={s.count}>{formatNumberWithTwoDecimals(ssfa.billing)} %</div>
                                    <div className={s.countLabel}>SSFA Billing %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <OutletSummary />
                <div className={cx("pt-5 d-flex justify-content-between flex-wrap align-items-center")}>
                    <div>
                        <div className={s.billingCountDetails}><span className={s.orangeColor}>SSFA Billing % : </span>SSFA count of Outlets / Total Outlets in CK</div>
                        <div className={s.billingCountDetails}><span className={s.orangeColor}>RSC Billing % : </span>RSC count of Outlets / SSFA count of Outlets</div>
                    </div>
                    <div>
                        {/* <Button className={s.downloadButton}>Download <ReactSVG src={downloadSvg} /></Button> */}
                    </div>
                </div>
            </Loader>
        </div>
    )
}

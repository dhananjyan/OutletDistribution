import cx from "classnames";

export default function Footer() {
    return (
        <div className="container-fluid">
            <div className={cx("d-flex justify-content-between align-items-center py-4 flex-wrap")}>
                <div>copyright &copy; 2023 CITPL. All rights reserved.</div>
                <div>Powered by Cavin infotech</div>
            </div>
        </div>
    )
}

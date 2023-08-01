import s from "./style.module.scss";
import Spinner from 'react-bootstrap/Spinner';

export default function DotLoader(props) {
    const { show = false, children } = props;
    return (
        <div className={s.parent}>
            {show ? <div className={s.spinner}>
                {/* <Spinner animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> */}
                <div className={s.loader}>
                    <div className={s.dot}></div>
                    <div className={s.dot}></div>
                    <div className={s.dot}></div>

                </div>
            </div> : ""}
            {children}
        </div>
    )
}

import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';

import cx from "classnames";
import s from "./style.module.scss";

import Filters from './Filters/Filters';
import Markers from './Markers/Markers';

export default function MapSection() {

    const mapData = useSelector(state => state?.map?.mapData?.[0]);

    return (
        <div>
            <Filters distributorCount={mapData?.dist_count} outletCount={mapData?.outlet_count} />
            <div className={cx(s.mapContainer)}>
                <div className={s.infoBox}>
                    <div className={s.infoItem}>
                        <i style={{ backgroundColor: "#f3a6b2" }} className={s.circle} />
                        {"<5k"}
                    </div>
                    <div className={s.infoItem}>
                        <i style={{ backgroundColor: "#28dbcc" }} className={s.circle} />
                        {"5k-10k"}
                    </div>
                    <div className={s.infoItem}>
                        <i style={{ backgroundColor: "#d82a55" }} className={s.circle} />
                        {"25k-50k"}
                    </div>
                    <div className={s.infoItem}>
                        <i style={{ backgroundColor: "#d82a55" }} className={s.circle} />
                        {"50k-1L"}
                    </div>
                    <div className={s.infoItem}>
                        <i style={{ backgroundColor: "#4885e7" }} className={s.circle} />
                        {"1L-2L"}
                    </div>
                    <div className={s.infoItem}>
                        <i style={{ backgroundColor: "#987db7" }} className={s.circle} />
                        {"2L-5L"}
                    </div>
                    <div className={s.infoItem}>
                        <i style={{ backgroundColor: "#becf50" }} className={s.circle} />
                        {"5L-10L"}
                    </div>
                    <div className={s.infoItem}>
                        <i style={{ backgroundColor: "#89995e" }} className={s.circle} />
                        {">10L"}
                    </div>
                </div>
                <MapContainer center={mapData?.coordinates} maxZoom={14} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        url="/images_tn/{z}/{x}/{y}.png"
                    />
                    <Markers
                        coordinates={mapData?.coordinates}
                        markers={mapData?.result}
                    />
                </MapContainer>
            </div>
        </div>
    )
}

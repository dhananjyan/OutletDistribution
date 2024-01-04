import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';

import cx from "classnames";
import s from "./style.module.scss";

import Filters from './Filters/Filters';
import Markers from './Markers/Markers';
import DotLoader from '../../DotLoader/DotLoader';

export default function MapSection() {

    const mapData = useSelector(state => state?.map?.mapData?.[0]);
    const isLoading = useSelector(state => state?.map?.isLoading);
    const showMap = useSelector(state => state?.map?.isShowMap);

    return (
        <div>
            <Filters distributorCount={mapData?.dist_count} outletCount={mapData?.outlet_count} />
            <DotLoader show={isLoading}>
                {showMap ? <div className={cx(s.mapContainer)}>
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
                    <MapContainer center={mapData?.coordinates} maxZoom={16} zoom={16} scrollWheelZoom={false}>
                        <TileLayer
                        // https://outletdistribution.blob.core.windows.net/outletdistribution/map/TAMILNADU/16/47356/30410.png?sp=racwdli&st=2024-01-04T08:03:01Z&se=2024-01-11T16:03:01Z&sv=2022-11-02&sr=c&sig=%2F%2BYwSap5VnPE96aCmACUgYPsuc7vA8GTtYTyej3QcL8%3D
                            url={`https://outletdistribution.blob.core.windows.net/outletdistribution/map/${mapData?.state}/{z}/{x}/{y}.png?sp=racwdli&st=2024-01-04T08:03:01Z&se=2024-01-11T16:03:01Z&sv=2022-11-02&sr=c&sig=%2F%2BYwSap5VnPE96aCmACUgYPsuc7vA8GTtYTyej3QcL8%3D`}
                        />
                        {mapData?.result?.length ? <Markers
                            coordinates={mapData?.coordinates}
                            markers={mapData?.result}
                        /> : ""}
                    </MapContainer>
                </div> : ""}
            </DotLoader>
        </div>
    )
}

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

    return (
        <div>
            <Filters distributorCount={mapData?.dist_count} outletCount={mapData?.outlet_count} />
            <DotLoader show={isLoading}>
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
                    <MapContainer center={mapData?.coordinates} maxZoom={16} zoom={16} scrollWheelZoom={false}>
                        <TileLayer
                            url={`https://outletdistribution.blob.core.windows.net/outletdistribution/map/${mapData?.state}/{z}/{x}/{y}.png?sp=racwdl&st=2023-08-01T09:55:52Z&se=2023-10-31T17:55:52Z&sv=2022-11-02&sr=c&sig=3hR664FSk8dIsvVSYUE5pGiFVdGr6yEtWSZfIZ1153w%3D`}
                        />
                        {mapData?.result?.length ? <Markers
                            coordinates={mapData?.coordinates}
                            markers={mapData?.result}
                        /> : ""}
                    </MapContainer>
                </div>
            </DotLoader>
        </div>
    )
}

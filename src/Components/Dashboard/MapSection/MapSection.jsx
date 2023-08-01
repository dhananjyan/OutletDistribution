import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import s from "./style.module.scss";
import cx from "classnames";
import Filters from './Filters/Filters';

import L, { Icon, } from 'leaflet';

import distributorMarkerSvg from "../../../assets/distributorMarker.png";

const iconPerson = new Icon({
    iconUrl: distributorMarkerSvg,
    // iconAnchor: distributorMarkerSvg,
    // popupAnchor: null,
    // iconSize: new L.Point(60, 75),
    iconSize: [31, 46], // size of the icon
    iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: 'leaflet-div-icon'
});

const markerList = [
    {
        position: [9.939093, 78.121719],
        popupMessage: "This is the sample popup message - 1"
    },
    {
        position: [9.938093, 78.129719],
        popupMessage: "This is the sample popup message - 2"
    },
    {
        position: [9.939193, 78.121219],
        popupMessage: "This is the sample popup message - 3"
    },
    {
        position: [9.839093, 78.121719],
        popupMessage: "This is the sample popup message - 4"
    },
];

export default function MapSection() {

    return (
        <div>
            <Filters />
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
                <MapContainer center={[9.939093, 78.121719]} maxZoom={15} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        url="/images_tn/{z}/{x}/{y}.png"
                    />
                    {markerList?.map((marker, i) => {
                        return (<Marker key={`MARKER_ITEM_${i}_${marker?.position?.[0]}`} position={marker.position} icon={iconPerson}>
                            <Popup>
                                {marker.popupMessage}
                            </Popup>
                        </Marker>)
                    })}
                </MapContainer>
            </div>
        </div>
    )
}

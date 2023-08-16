import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

import { Icon, } from 'leaflet';

import s from "./style.module.scss";
import MarkerClusterGroup from 'react-leaflet-cluster'

import distributorMarker from "../../../../assets/distributorMarker.png";
import outletMarker from "../../../../assets/outletMarker.png";

const distributorIcon = new Icon({
    iconUrl: distributorMarker,
    // iconAnchor: distributorMarker,
    // popupAnchor: null,
    iconSize: new L.Point(15, 15),
    // iconSize: [15, 15], // size of the icon
    // iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    // popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    // className: 'leaflet-div-icon'
});

const outletIcon = new Icon({
    iconUrl: outletMarker,
    // iconAnchor: distributorMarker,
    // popupAnchor: null,
    iconSize: new L.Point(15, 15),
    // iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
    // popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    // className: 'leaflet-div-icon'
});

export default function Markers(props) {
    const { markers, coordinates } = props;

    const map = useMap();

    useEffect(() => {
        if (coordinates) {
            let coordinates = markers.map(item => [item[2], item[3]])
            map.fitBounds(coordinates)
        }
    }, [coordinates])


    return (
        <MarkerClusterGroup
            chunkedLoading
        >
            {markers?.map((marker, i) => {
                const icon = marker[4] == "Outlet" ? outletIcon : distributorIcon;
                if (marker?.length)
                    return (<Marker key={`MARKER_ITEM_${i}_${marker?.[2]}`} position={[marker[2], marker[3]]} icon={icon}>
                        <Popup>
                            {marker[4] == "Outlet" ? <>
                                <div><span className={s.popupLabel}>SSNAME:</span> {marker[0]}</div>
                                <div><span className={s.popupLabel}>Customer Name: </span>{marker[1]}</div>
                            </> : <>
                                <div><span className={s.popupLabel}>SSNAME:</span> {marker[0]}</div>
                                <div><span className={s.popupLabel}>Distributor  Name: </span>{marker[5]}</div>
                            </>}
                        </Popup>
                    </Marker>)
            })}
        </MarkerClusterGroup>
    )
}

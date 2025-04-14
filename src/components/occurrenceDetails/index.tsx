'use client'
import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
// import "leaflet-defaulticon-compatibility";

import { use } from 'react'
import { OccurrenceDetail } from "@/services/occurrences_api"
import { formatDate, formatName, formatPlace, formatTime } from "@/services/occurrence_helper";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

export default function OccurrenceDetails(
    {
        details,
    }: {
        details: Promise<OccurrenceDetail>
    }
) {
    const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41]
    });
    const dets = use(details);
    const position: [number, number] = [dets.decimalLatitude, dets.decimalLongitude]

    return (
        <div className="
                flex flex-row justify-between
                h-screen w-4xl m-auto bg-white outline outline-black/5 shadow-lg
                dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 dark:bg-gray-800
            "
        >
            <div className="float-left p-4 grow h-full w-full">
                <img className="min-w-full h-70 object-cover object-center" src={dets.media[0].identifier} />
                <h1>{formatName(dets.acceptedScientificName)}</h1>
                <div className="float-left">
                    <p>Found by: {dets.identifiedBy}</p>
                    <p>During: {formatDate(dets.eventDate)}, at {formatTime(dets.eventTime)}</p>
                    <p>Estado taxiconômico: {dets.taxonomicStatus}</p>
                </div>
                <div className="float-right">
                    <p>Reino: {dets.kingdom}</p>
                    <p>Filo: {dets.phylum}</p>
                    <p>Classe: {dets.class}</p>
                    <p>Ordem: {dets.order}</p>
                    <p>Família: {dets.family}</p>
                    <p>Gênero: {dets.genus}</p>
                </div>
            </div>
            <MapContainer className="w-xs h-full float-right shrink-0" center={position} zoom={9} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={icon}>
                    <Popup>
                        {formatPlace(dets.country, dets.continent)}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

'use client'
import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
// import "leaflet-defaulticon-compatibility";

import { use } from 'react'
import { OccurrenceDetail } from "@/services/occurrences_api"
import { formatDate, formatName, formatPlace, formatTime, validateName } from "@/services/occurrence_helper";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
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
    const place = formatPlace(dets.country, dets.continent);

    return (
        <div className="
                flex flex-col sm:flex-row justify-between relative
                h-screen w-full lg:w-4xl m-auto bg-white outline outline-black/5 shadow-lg
                dark:shadow-none dark:outline-0 dark:border-x dark:border-white/10 dark:bg-gray-800
            "
        >
            <div className="float-left p-4 grow h-full w-full flex flex-col">
                <img className="min-w-full h-50 md:h-70 object-cover object-center mb-3" src={dets.media[0].identifier} />
                <h1 className="text-3xl py-0 my-2 border-b shadow-(--title-shadow)">{formatName(dets.acceptedScientificName)}</h1>
                <div className="w-100% grow pt-3 flex flex-col md:flex-row justify-between relative">
                    <div className="float-left">
                        <p>Encontrado por: {validateName(dets.identifiedBy)}</p>
                        <p>Em: {place}</p>
                        <p>Estado: {dets.taxonomicStatus}</p>
                        <p className="absolute top-15 right-3 md:top-auto md:bottom-0 md:left-3 italic text-gray-500 dark:text-gray-300">{formatDate(dets.eventDate)}, {formatTime(dets.eventTime)}</p>
                    </div>
                    <div className="
                            float-right h-full w-auto p-5 flex flex-col justify-between
                            bg-linear-0 from-amber-400/50 to-yellow-700/50
                            font-semibold mt-3 md:mt-0
                        "
                    >
                        <p>Reino: <span className="float-right font-normal ml-2">{dets.kingdom}</span></p>
                        <p>Filo:  <span className="float-right font-normal ml-2">{dets.phylum}</span></p>
                        <p>Classe:  <span className="float-right font-normal ml-2">{dets.class}</span></p>
                        <p>Ordem:  <span className="float-right font-normal ml-2">{dets.order}</span></p>
                        <p>Família:  <span className="float-right font-normal ml-2">{dets.family}</span></p>
                        <p>Gênero:  <span className="float-right font-normal ml-2">{dets.genus}</span></p>
                    </div>
                </div>
            </div>
            <div className="absolute hidden sm:block right-0 z-2 w-xs h-15 p-4 text-center">
                <h1 className="
                        w-full bg-white py-2 rounded-md text-xl font-medium
                        outline outline-black/5 shadow-lg
                        dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10
                    "
                >
                    Local de ocorrência
                </h1>
            </div>
            <MapContainer className="w-full sm:w-xs h-60 sm:h-full float-right shrink-0 z-1" center={position} zoom={9} scrollWheelZoom={true} zoomControl={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomleft" zoomInText="+" zoomOutText="-" />
                <Marker position={position} icon={icon}>
                    <Popup>
                        {place}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

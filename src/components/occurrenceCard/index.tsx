import { Occurrence } from "@/services/occurrences_api"

function formatDate(date: string) {
    const formated = date.slice(0, 10).split('-').reverse().join('/');
    return formated;
}

function formatName(sName: string) {
    const formated = sName.split(' ').slice(0,2).join(' ').replaceAll(',', '');
    return formated;
}

const kingdoms: {[id: string] : string} = {
    'Animalia': 'outline-yellow-500 bg-yellow-200/25', // 1
    'Bacteria': 'outline-orange-600 bg-orange-300/25', // 3
    'Fungi': 'outline-purple-900 bg-purple-600/25', // 5
    'Plantae': 'outline-green-600 bg-green-300/25', // 6
    'Protozoa': 'outline-blue-600 bg-blue-300/25' // 7
}



export default function OcurrenceCard(
    { occ }: { occ: Occurrence }
) {
    return (
        <div className="
                grow shrink-0 basis-[15%] mx-3
                rounded-md overflow-hidden
                outline bg-white shadow-lg outline-black/5
                dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10
            "
        >
            <img className="object-cover object-center w-full h-50" src={occ.media[0].identifier} />
            <div className="p-3">
                <h1 className="text-md font-bold mb-2">{formatName(occ.acceptedScientificName)}</h1>
                <p className="text-sm float-left text-gray-500 dark:text-gray-300">{formatDate(occ.eventDate)}</p>
                <span className={`text-sm float-right outline px-3 rounded-xl ${kingdoms[occ.kingdom]}`}>{occ.kingdom}</span>
                <div className="clear-both"></div>
            </div>
        </div>
    )
}

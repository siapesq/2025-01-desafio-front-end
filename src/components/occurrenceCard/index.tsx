import { formatDate, formatName } from "@/services/occurrence_helper";
import { Occurrence } from "@/services/occurrences_api"
import Link from "next/link";

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
        <Link 
            className="
                grow shrink-0 basis-[40%] md:basis-[20%] lg:basis-[15%] mx-1 lg:mx-3
                rounded-md overflow-hidden transition-shadow
                outline bg-white shadow-lg outline-black/5 hover:shadow-(--hover-shadow) hover:outline-green-800/50
                dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 dark:hover:outline-green-400/50
            "
            href={"/details/" + occ.gbifID.toString()}
        >
            <img className="object-cover object-center w-full h-50" src={occ.media[0].identifier} />
            <div className="p-3">
                <h1 className="text-md font-bold mb-2">{formatName(occ.acceptedScientificName)}</h1>
                <p className="text-sm float-left text-gray-500 dark:text-gray-300">{formatDate(occ.eventDate)}</p>
                <span className={`text-sm float-right outline px-3 rounded-xl ${kingdoms[occ.kingdom]}`}>{occ.kingdom}</span>
                <div className="clear-both"></div>
            </div>
        </Link>
    )
}

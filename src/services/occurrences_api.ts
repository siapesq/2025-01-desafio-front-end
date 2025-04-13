export type Occurrence = {
    acceptedScientificName: string,
    eventDate: string,
    kingdom: string,
    media: [{
        identifier: string
    }]
}

export async function GetOccurrences() : Promise<Occurrence[] | void> {
    const url = 'https://api.gbif.org/v1/occurrence/search?kingdomKey=1&kingdomKey=3&kingdomKey=5&kingdomKey=6&kingdomKey=7&mediaType=StillImage&limit=20';
    const response = fetch(url)
        .then((res) => res.json())
        .then((result) => 
            result.results.map((item: any) => ({
                acceptedScientificName: item.acceptedScientificName,
                eventDate: item.eventDate,
                kingdom: item.kingdom,
                media: [{
                    identifier: item.media[0].identifier,
                }]
            } as Occurrence))
        )

    return response
}

export type Occurrence = {
    gbifID: number,
    acceptedScientificName: string,
    eventDate: string,
    kingdom: string,
    media: [{
        identifier: string
    }]
}

export type OccurrenceDetail = {
    gbifID: number,
    acceptedScientificName: string,
    eventDate: string,
    eventTime: string,
    kingdom: string,
    phylum: string,
    class: string,
    order: string,
    family: string,
    genus: string,
    media: [{
        identifier: string
    }],
    identifiedBy: string,
    decimalLatitude: number,
    decimalLongitude: number,
    taxonomicStatus: string,
    continent: string,
    country: string
}

export async function GetOccurrences(offset: number) : Promise<Occurrence[]> {
    const url = `https://api.gbif.org/v1/occurrence/search?kingdomKey=1&kingdomKey=3&kingdomKey=5&kingdomKey=6&kingdomKey=7&mediaType=StillImage&limit=20&offset=${offset.toString()}`;
    const response = fetch(url)
        .then((res) => res.json())
        .then((result) => 
            result.results.map((item: any) => ({
                gbifID: item.gbifID,
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

export async function GetOccurrenceByGbifID(gbifId: string) : Promise<OccurrenceDetail> {
    const url = `https://api.gbif.org/v1/occurrence/${gbifId}`;
    const response = fetch(url)
        .then((res) => res.json())
        .then((result) => 
            ({
                gbifID: result.gbifID,
                acceptedScientificName: result.acceptedScientificName,
                eventDate: result.eventDate,
                eventTime: result.eventTime,
                kingdom: result.kingdom,
                phylum: result.phylum,
                class: result.class,
                order: result.order,
                family: result.family,
                genus: result.genus,
                media: [{
                    identifier: result.media[0].identifier,
                }],
                identifiedBy: result.identifiedBy,
                decimalLatitude: result.decimalLatitude,
                decimalLongitude: result.decimalLongitude,
                taxonomicStatus: result.taxonomicStatus,
                continent: result.continent,
                country: result.country
            } as OccurrenceDetail));

    return response
}

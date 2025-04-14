'use client'
import { use } from 'react'
import { Occurrence } from '@/services/occurrences_api';
import OccurrenceCard from '@/components/occurrenceCard';

export default function OccurrenceTable(
    {
        occurrences,
    }: {
        occurrences: Promise<Occurrence[] | void>
    }
) {
    const occurs = use(occurrences);

    return (
        <div className="flex flex-row flex-wrap gap-y-7 py-3" >
            {occurs?.map((occ, ind) => (
                <OccurrenceCard key={ind} occ={occ} />
            ))}
        </div>
    )
}

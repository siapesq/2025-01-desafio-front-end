import { Occurrence } from '@/services/occurrences_api';
import OccurrenceCard from '@/components/occurrenceCard';

export default function OccurrenceTable(
    {
        occurrences,
    }: {
        occurrences: Occurrence[]
    }
) {

    return (
        <div className="flex flex-row flex-wrap gap-y-7 py-3" >
            {occurrences.map((occ, ind) => (
                <OccurrenceCard key={ind} occ={occ} />
            ))}
        </div>
    )
}

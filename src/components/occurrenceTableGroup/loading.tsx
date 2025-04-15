'use client'
import Loading from '@/components/occurrenceCard/loading';
import { useState } from 'react';

export default function OccurrenceTableLoading() {
    const [occurs, setOccurs] = useState([...Array(20).keys()])

    return (
        <div className="flex flex-row flex-wrap gap-y-7 py-3" >
            {occurs.map((occ, ind) => (
                <Loading key={ind} />
            ))}
        </div>
    )
}

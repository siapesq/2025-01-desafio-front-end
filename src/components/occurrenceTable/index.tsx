'use client'
import { SyntheticEvent, useRef, useState, useEffect } from 'react'
import { Occurrence, GetOccurrences } from '@/services/occurrences_api';
import OccurrenceTableGroup from '@/components/occurrenceTableGroup';
import Loading from '@/components/occurrenceTableGroup/loading';

export default function OccurrenceTable() {
    const [occurs, setOccurs] = useState<Occurrence[]>([])
    const [lim, setLim] = useState(0)
    const loading = useRef(true)

    useEffect(() => {
        fillData();
    }, [lim]);

    const fillData = async () => {
        const result = await GetOccurrences(lim);
        setOccurs(occurs.concat(result));
        loading.current = false;
    }

    const handleScroll = (e: SyntheticEvent) => {
        const el = e.target as HTMLElement;
        const dist = el.scrollHeight - el.scrollTop - el.offsetHeight;
        if (!loading.current && dist < 200){
            console.log('loading more...')
            loading.current = true;
            setLim(lim+20);
        }
    }

    return (
        <div
            className="grow h-full overflow-y-scroll overflow-x-hidden"
            onScroll={handleScroll}
        >
            <OccurrenceTableGroup occurrences={occurs} />
            { loading.current && <Loading /> }
        </div>
    )
}

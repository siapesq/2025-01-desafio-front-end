'use client'
import { Suspense, SyntheticEvent, useRef, useState } from 'react'
import { Occurrence, GetOccurrences } from '@/services/occurrences_api';
import OccurrenceTableGroup from '@/components/occurrenceTableGroup';
import Loading from '@/components/occurrenceTableGroup/loading';

export default function OccurrenceTable() {
    const [lim, setLim] = useState(20)
    const [occurs, setOccurs] = useState(GetOccurrences(lim))
    const [old, setOld] = useState(occurs)
    const canLoad = useRef(true)

    const handleScroll = (e: SyntheticEvent) => {
        const el = e.target as HTMLElement;
        const dist = el.scrollHeight - el.scrollTop - el.offsetHeight;
        console.log(dist)
        if (canLoad.current && dist < 200){
            console.log('load more...');
            canLoad.current = false
            setOld(occurs)
            setOccurs(GetOccurrences(lim+20))
            setLim(lim+20)
            setTimeout(() => {
                canLoad.current = true
            }, 1000)
        }
    }

    return (
        <div
            className="h-screen overflow-y-scroll overflow-x-hidden"
            onScroll={handleScroll}
        >
            <Suspense fallback={
                <>
                    <OccurrenceTableGroup occurrences={old} />
                    <Loading />
                </>
            } >
                <OccurrenceTableGroup occurrences={occurs} />
            </Suspense>
        </div>
    )
}

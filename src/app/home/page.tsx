import OccurrenceTable from '@/components/occurrenceTable';
import { GetOccurrences } from '@/services/occurrences_api';
import { Suspense } from 'react';

export default function MainPage() {
    const occurRequest = GetOccurrences()

    // const onRequest = useRef(false);
    // const handleScroll = (e: SyntheticEvent) => {
    //     if(onRequest.current) return;
    //     const el = e.target as HTMLInputElement
    //     console.log(el.offsetHeight - el.scrollTop);
    //     if (el.offsetHeight - el.scrollTop < 200) {
    //         onRequest.current = true;
    //         setTimeout(() => {
    //             console.log('teste');
    //             onRequest.current = false;
    //         }, 200)
    //     }
    // }

    return(
        <div className="h-screen overflow-y-scroll overflow-x-hidden" >
            <Suspense fallback={<div>Loading...</div>}>
                <OccurrenceTable occurrences={occurRequest} />
            </Suspense>
        </div>
    )
}

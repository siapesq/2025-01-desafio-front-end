'use client'
import { GetOccurrenceByGbifID } from '@/services/occurrences_api'
import { useParams } from 'next/navigation'

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/occurrenceDetails"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function DetailContainer() {
    const params: { gbifId: string } = useParams()
    const detailsRequest = GetOccurrenceByGbifID(params.gbifId)
    const props = {'details': detailsRequest}

    return (
        <div className="h-screen w-screen bg-green-200 dark:bg-emerald-950"
        >
            <LazyMap {...props} />
        </div>
    )
}

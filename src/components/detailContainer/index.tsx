'use client'
import { GetOccurrenceByGbifID } from '@/services/occurrences_api'
import { useParams } from 'next/navigation'
import dynamic from "next/dynamic";
import Loading from '../occurrenceDetails/loading';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LazyMap = dynamic(() => import("@/components/occurrenceDetails"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function DetailContainer() {
    const params: { gbifId: string } = useParams()
    const detailsRequest = GetOccurrenceByGbifID(params.gbifId)
    const props = {'details': detailsRequest}

    return (
        <div className="h-screen w-screen bg-green-200 dark:bg-emerald-950"
        >
            <Link
                className="
                    absolute left-4 top-4 p-3 rounded-full
                    outline bg-white shadow-lg outline-black/5
                    dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10
                    z-2
                "
                href="/home"
            >
                <ArrowBackIcon />
            </Link>
            <LazyMap {...props} />
        </div>
    )
}

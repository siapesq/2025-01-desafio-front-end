import OccurrenceTableLoading from "@/components/occurrenceTableGroup/loading";
import { Skeleton } from "@mui/material";

export default function Loading() {
    return(
        <div className='h-screen flex flex-col'>
            <Skeleton variant='rectangular' className="min-w-full !min-h-15 dark:!bg-gray-500/50" />
            <OccurrenceTableLoading />
        </div>
    )
  }
  
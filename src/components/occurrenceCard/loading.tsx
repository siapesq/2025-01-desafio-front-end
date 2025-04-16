import { Skeleton } from "@mui/material";

export default function OcurrenceCardLoading() {

    return (
        <div 
            className="
                grow shrink-0 basis-[40%] md:basis-[20%] lg:basis-[15%] mx-3
                rounded-md overflow-hidden
                outline bg-white shadow-lg outline-black/5
                dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10
            "
        >
            <Skeleton variant="rectangular" className="w-full !h-50" />
            <div className="p-3">
                <Skeleton variant="text" className="text-md !mb-2"></Skeleton>
                <Skeleton variant="text" className="text-sm float-left px-7"></Skeleton>
                <Skeleton variant="text" className='text-sm float-right px-3'></Skeleton>
                <div className="clear-both"></div>
            </div>
        </div>
    )
}

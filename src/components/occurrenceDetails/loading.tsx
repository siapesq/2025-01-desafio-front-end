import { Skeleton } from "@mui/material";

export default function OccurrenceDetailsLoading() {

    return (
        <div className="
                flex flex-col sm:flex-row justify-between relative
                h-screen w-full lg:w-4xl m-auto bg-white outline outline-black/5 shadow-lg
                dark:shadow-none dark:outline-0 dark:border-x dark:border-white/10 dark:bg-gray-800
            "
        >
            <div className="float-left p-4 grow h-full w-full flex flex-col">
                <Skeleton variant='rectangular' className="min-w-full !h-50 md:!h-70 mb-3 dark:!bg-gray-500/50" />
                <Skeleton variant='text' className="text-4xl py-0 my-2 dark:!bg-gray-500/50" />
                <div className="w-100% grow pt-3 flex flex-col md:flex-row justify-between">
                    <div className="float-left grow pr-10">
                        <Skeleton variant="text" className="text-2xl dark:!bg-gray-500/50" />
                        <Skeleton variant="text" className="text-2xl dark:!bg-gray-500/50" />
                        <Skeleton variant="text" className="text-2xl dark:!bg-gray-500/50" />
                        <Skeleton variant="text" className="text-2xl absolute !hidden md:!block bottom-3 left-3 px-15 dark:!bg-gray-500/50" />
                    </div>
                    <Skeleton
                        variant="rectangular"
                        className="float-right mt-3 md:mt-0 w-full md:w-2/5 p-5 !h-40 md:!h-full dark:!bg-gray-500/50"
                    />
                </div>
            </div>
            <div className="w-full sm:w-xs !h-60 sm:!h-full shrink-0">
                <Skeleton variant="rectangular" className="!w-full !h-full dark:!bg-gray-500/50" />
            </div>
        </div>
    )
}

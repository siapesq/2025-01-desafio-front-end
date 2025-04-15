import { Skeleton } from "@mui/material";

export default function OccurrenceDetailsLoading() {

    return (
        <div className="
                flex flex-row justify-between relative
                h-screen w-4xl m-auto bg-white outline outline-black/5 shadow-lg
                dark:shadow-none dark:outline-0 dark:border-x dark:border-white/10 dark:bg-gray-800
            "
        >
            <div className="float-left p-4 grow h-full w-full flex flex-col">
                <Skeleton variant='rectangular' className="min-w-full py-35 mb-3 dark:!bg-gray-500/50" />
                <Skeleton variant='text' className="text-4xl py-0 my-2 dark:!bg-gray-500/50" />
                <div className="w-100% grow pt-3 flex flex-row justify-between">
                    <div className="float-left grow pr-10">
                        <Skeleton variant="text" className="text-2xl dark:!bg-gray-500/50" />
                        <Skeleton variant="text" className="text-2xl dark:!bg-gray-500/50" />
                        <Skeleton variant="text" className="text-2xl dark:!bg-gray-500/50" />
                        <Skeleton variant="text" className="text-2xl absolute bottom-3 px-15 dark:!bg-gray-500/50" />
                    </div>
                    <Skeleton
                        variant="rectangular"
                        className="float-right w-2/5 p-5 !h-full dark:!bg-gray-500/50"
                    />
                </div>
            </div>
            <div className="w-xs h-full shrink-0">
                <Skeleton variant="rectangular" className="!w-full !h-full dark:!bg-gray-500/50" />
            </div>
        </div>
    )
}

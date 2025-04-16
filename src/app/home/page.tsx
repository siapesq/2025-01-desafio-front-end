'use server'
import OccurrenceTable from '@/components/occurrenceTable';
import { getSession } from '@/services/login_services';
import Link from 'next/link';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default async function MainPage() {
    const session = await getSession();

    return(
        <div className='h-screen flex flex-col'>
            <div
                className='
                    w-full h-auto py-4 px-10 bg-linear-180 bg-transparent from-gray-300/75 to-gray-200/25
                    dark:from-gray-700/75 dark:to-gray-600/25
                '
            >
                {(session === null) ?
                <Link
                    href="/login"
                    className='float-right flex flex-row align-center w-auto p-1 outline px-3 rounded-full dark:text-gray-300'
                >
                    <AccountCircleOutlinedIcon className="mr-1" />
                    <span>Fazer login</span>
                </Link> :
                <div
                    className='float-right flex flex-row items-center w-auto py-1 rounded-full'
                >
                    <AccountCircleOutlinedIcon className="mr-1" />
                    <span className='float-right'>{session?.user?.name}</span>
                    <div className="border py-2 mx-3"></div>
                    <Link
                        href="/login"
                        className='underline text-red-400 decoration-red-400'
                    >
                        Sair
                    </Link>
                </div>
                }
            </div>
            <OccurrenceTable />
        </div>
    )
}

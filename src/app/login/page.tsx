import { signIn } from "@/services/login_services";
import Link from "next/link";

export default function LoginPage() {
    const inputClass = 'py-2 px-1 w-full border-b-2 outline-0 focus:border-green-500 dark:focus:border-green-800 transition-colors'

    return(
        <div className=" px-5 h-screen w-screen flex flex-col items-center justify-center gap-y-4 bg-green-200 dark:bg-emerald-950">
            <form
                action={signIn}
                className="
                    mx-auto flex flex-col gap-y-3 items-center rounded-xl px-8 py-12 w-full sm:w-md
                    outline bg-white shadow-lg outline-black/5
                    dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10
                "
            >
                <h1 className="text-4xl font-bold dark:text-white">Sign in</h1>
                <p>sign in to continue</p>
                <input type="text" name="email" placeholder="Email address" className={inputClass} />
                <input type="password" name="password" placeholder="Password" className={inputClass} />
                <button type="submit" className="w-full text-2xl sm:text-xl bg-green-500 py-4 rounded-md mt-5 cursor-pointer text-white dark:bg-green-800">Sign in</button>
            </form>
            <span>
                Don't have an account? <Link
                    className="
                            underline text-blue-700 decoration-blue-700
                            dark:text-blue-400 dark:decoration-blue-400
                        "
                    href="/register"
                >
                    Sign Up
                </Link>
            </span>
        </div>
    )
}
import { signIn } from "@/services/login_services";
import Link from "next/link";

export default function RegisterPage() {
    const inputClass = 'py-2 px-1 w-full border-b-2 outline-0 focus:border-green-500 dark:focus:border-green-800 transition-colors'

    return(
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-y-4 bg-green-200 dark:bg-emerald-950">
            <form
                action={signIn}
                className="
                    mx-auto flex w-md flex-col gap-y-3 items-center rounded-xl px-8 py-12 outline
                    bg-white shadow-lg outline-black/5
                    dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10
                "
            >
                <h1 className="text-4xl font-bold dark:text-white">Sign up</h1>
                <p>sign up to continue</p>
                <input type="text" name="name" placeholder="Your name" className={inputClass} />
                <input type="text" name="email" placeholder="Email address" className={inputClass} />
                <input type="password" name="password" placeholder="Password" className={inputClass} />
                <button type="submit" className="w-full text-xl bg-green-500 py-4 rounded-md mt-5 cursor-pointer text-white dark:bg-green-800">Sign up</button>
            </form>
            <span>Already have an account? <Link className="text-blue-700 underline decoration-blue-700 dark:text-blue-400 dark:decoration-blue-400" href="/login">Sign In</Link></span>
        </div>
    )
}
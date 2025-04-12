import { createUser } from "@/services/login_services";
import { Button, TextField } from "@mui/material";

export default function LoginPage() {

    return(
        <div className="h-screen w-screen flex bg-green-200 dark:bg-emerald-950">
            <form
                action={createUser}
                className="
                    m-auto flex w-md flex-col gap-y-3 items-center rounded-xl px-8 py-12 outline
                    bg-white shadow-lg outline-black/5
                    dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10
                "
            >
                <h1 className="text-4xl font-bold dark:text-white">Sign up</h1>
                <p>sign up to continue</p>
                <input type="text" name="name" placeholder="Your name" className="py-2 px-1 w-full border-b-2 outline-0 focus:border-green-500 dark:focus:border-green-800 transition-colors" />
                <input type="text" name="email" placeholder="Email address" className="py-2 px-1 w-full border-b-2 outline-0 focus:border-green-500 dark:focus:border-green-800" />
                <input type="password" name="password" placeholder="Password" className="py-2 px-1 w-full border-b-2 outline-0 focus:border-green-500 dark:focus:border-green-800" />
                <button type="submit" className="w-full text-xl bg-green-500 py-4 rounded-md mt-5 cursor-pointer text-white dark:bg-green-800">Sign up</button>
            </form>

        </div>
    )
}
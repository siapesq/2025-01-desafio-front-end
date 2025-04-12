"use server"

import { redirect } from "next/navigation"
 
export async function signUp(formData: FormData) {
    // register code
    const email = formData.get('email')
    const password = formData.get('password')

    console.log(`${email} - ${password}`)
    redirect('/home')
}

export async function signIn(formData: FormData) {
    // log in code

    redirect('/home')
}

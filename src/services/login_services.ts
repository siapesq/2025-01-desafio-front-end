"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from 'next/cache'
 
export async function signUp(formData: FormData) {
    // register code
    const email = formData.get('email')
    const password = formData.get('password')

    console.log(`${email} - ${password}`)
    revalidatePath('/home')
    redirect('/home')
}

export async function signIn(formData: FormData) {
    // log in code

    redirect('/home');
    // return 'Passed'
}

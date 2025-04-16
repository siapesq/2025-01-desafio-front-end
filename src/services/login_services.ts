"use server"

import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation"
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache'

const secretKey = "secretKey"; // Idealmente por no .env (não botei por não ser importante)
const key = new TextEncoder().encode(secretKey);

async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .sign(key);
}

async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function signUp(formData: FormData) {
    // register code
    // redirect('/home')
}

export async function signIn(formData: FormData) {
    const nome = (formData.get('name') == undefined) ? 'Nome' : formData.get('name');
    const user = { email: formData.get("email"), name: nome };

    // Create the session
    const expires = new Date(Date.now() + 86400 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    const cookie = await cookies();
    cookie.set("session", session, { expires, httpOnly: true });

    redirect('/home');
}

export async function getSession() {
    const cookie = await cookies();
    const session = cookie.get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

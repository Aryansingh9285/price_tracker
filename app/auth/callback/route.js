import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    try {
        if (code) {
            const cookieStore = await cookies();
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
            const supabase = createServerClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                key,
                {
                    cookies: {
                        getAll() {
                            return cookieStore.getAll();
                        },
                        setAll(cookiesToSet) {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            );
                        },
                    },
                }
            );

            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
                console.error("Supabase exchangeCodeForSession error:", error);
            } else {
                console.log("Supabase session exchanged:", data?.session ? "ok" : "no-session");
            }
        }
    } catch (err) {
        console.error("Auth callback handler error:", err);
    }

    return NextResponse.redirect(new URL("/", request.url));
}
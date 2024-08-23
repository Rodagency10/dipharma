// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Récupère le token JWT des cookies

  // Si le token n'existe pas, redirige vers la page de login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Si l'utilisateur est connecté, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/settings", "/dashboard", "/profile", "pharmacie", "documentation"], // Chemins à protéger
};

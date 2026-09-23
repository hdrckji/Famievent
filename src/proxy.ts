import { NextRequest, NextResponse } from "next/server";

// Protège /admin et /api/export par une authentification HTTP Basic.
// Identifiants définis via ADMIN_USER / ADMIN_PASSWORD.
// (Next.js 16 : ce fichier remplace l'ancien middleware.ts.)

export function proxy(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedPass) {
    return new NextResponse(
      "Administration non configurée (ADMIN_PASSWORD manquant).",
      { status: 500 },
    );
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(":");
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    if (user === expectedUser && pass === expectedPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentification requise.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Famievent Admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/export", "/api/export/:path*"],
};

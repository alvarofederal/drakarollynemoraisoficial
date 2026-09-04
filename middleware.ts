import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Protege o painel administrativo. A verificação é apenas do cookie de
// sessão — a validação real acontece no layout de /admin (server component).
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value

  if (!sessionToken) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

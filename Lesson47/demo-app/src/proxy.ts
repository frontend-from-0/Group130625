import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Blocks drive-by abuse of /api/quiz from other sites and most anonymous curl
 * scripts (no Origin/Referer). Not a substitute for rate limits or auth—anyone
 * can still replay requests with a spoofed Origin header.
 */
function isAllowedQuizRequest(request: NextRequest): boolean {
  const host = request.headers.get('host');
  if (!host) {
    return false;
  }

  const origin = request.headers.get('origin');
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  const referer = request.headers.get('referer');
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return false;
}

export function proxy(request: NextRequest) {
  if (!isAllowedQuizRequest(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/quiz',
};

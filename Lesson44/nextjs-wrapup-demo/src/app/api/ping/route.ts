import { NextResponse } from "next/server";

/**
 * Route handlers under `app/api/.../route.ts` deploy as isolated server endpoints—similar in
 * spirit to a “cloud function”: one URL, short-lived process, logs in the host’s dashboard (e.g.
 * Vercel Runtime Logs). This handler stays small on purpose for lessons.
 */

export async function GET() {
  const at = new Date().toISOString();
  console.log(`[api/ping] GET at ${at}`);
  return NextResponse.json({
    ok: true,
    message: "pong",
    at,
    hint: 'POST JSON { "message": "..." } to log a custom line on the server.',
  });
}

type PingBody = {
  message?: unknown;
};

export async function POST(request: Request) {
  const at = new Date().toISOString();
  let logged = "";

  try {
    const body = (await request.json()) as PingBody;
    logged =
      typeof body.message === "string"
        ? body.message
        : JSON.stringify(body ?? {});
  } catch {
    logged = "(could not parse JSON body)";
  }

  console.log(`[api/ping] POST at ${at} message=${logged}`);

  return NextResponse.json({
    ok: true,
    logged,
    at,
  });
}

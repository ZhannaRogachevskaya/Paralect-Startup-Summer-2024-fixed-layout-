import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.TMDB_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,

    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    return NextResponse.json({ status: response.status });
  }
  const data = await response.json();
  return NextResponse.json({ data });
}

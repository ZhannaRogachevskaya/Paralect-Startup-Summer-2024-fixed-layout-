import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const API_KEY = process.env.TMDB_KEY;

  const term = searchParams.get("query") || "";

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US`,

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

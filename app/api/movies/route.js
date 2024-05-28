import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const API_KEY = process.env.TMDB_KEY;

  const activePage = searchParams.get("page") || 1;
  const selectedYear = searchParams.get("primary_release_year") || 2024;
  const sortBy = searchParams.get("sort_by") || "popularity.desc";
  const voteGte = searchParams.get("vote_average.gte") || 5;
  const voteLte = searchParams.get("vote_average.lte") || 6;
  const idSelectedGenre = searchParams.get("with_genres") || 18;

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${activePage}&primary_release_year=${selectedYear}&sort_by=${sortBy}&vote_average.gte=${voteGte}&vote_average.lte=${voteLte}&with_genres=${idSelectedGenre}`,

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

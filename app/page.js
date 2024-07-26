"use client";
import "./page.css";
import { Button } from "@mantine/core";

import { MainLayout } from "../components/MainLayout/MainLayout";
import { Filters } from "../components/Filters/Filters";
import { CardItem } from "../components/CardItem/CardItem";
import { SortBy } from "../components/SortBy/SortBy";
import { MyPagination } from "../components/MyPagination/MyPagination";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { EmptySearchResult } from "../components/EmptySearchResult/EmptySearchResult";

import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [idSelectedGenre, setIdSelectedGenre] = useState("");
  const [term, setTerm] = useState("");
  const [yearList, setYearList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(0);
  const [voteGte, setVoteGte] = useState("");
  const [voteLte, setVoteLte] = useState("");
  const [sortBy, setSortBy] = useState("vote_average.desc");
  const [activePage, setPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [emptyResult, setEmptyResult] = useState(false);

  useEffect(() => {
    const dataMovies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/movies?page=${activePage}&primary_release_year=${selectedYear}&sort_by=${sortBy}&vote_average.gte=${voteGte}&vote_average.lte=${voteLte}&with_genres=${idSelectedGenre}`
        );
        if (!response.ok) {
          throw new Error(` ${response.statusText}`);
        }
        const json = await response.json();
        setData(json.data.results);
        setTotalPages(json.data.total_pages);
      } catch (err) {
        console.error(err);
      }
    };
    dataMovies();
  }, [activePage, selectedYear, sortBy, voteGte, voteLte, idSelectedGenre]);

  const onUpdateSearch = (term) => {
    setTerm(term);
  };
  const onSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/movies/search?query=${term}`
      );
      if (!response.ok) {
        throw new Error(` ${response.statusText}`);
      }
      const json = await response.json();
      if (term !== "" && json.data.results == false) {
        setEmptyResult(true);
      } else {
        setEmptyResult(false);
        setResultSearch(json.data.results);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [genreList, setGenreList] = useState([]);
  useEffect(() => {
    const listGenres = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/movies/genreList`
        );
        if (!response.ok) {
          throw new Error(` ${response.statusText}`);
        }
        const json = await response.json();
        setGenreList(json.data.genres);

        json.data.genres.forEach((item) => {
          newList[item.id] = item.name;
        });
      } catch (err) {
        console.error(err);
      }
    };
    listGenres();
  }, []);

  const newList = [];
  genreList.forEach((item) => {
    newList[item.id] = item.name;
  });

  const onChangeGenres = (event) => {
    setResultSearch([]);
    const genreValue = event.target.value;
    genreList.forEach((elem) => {
      if (elem.name === genreValue) {
        setSelectedGenre(genreValue);
        setIdSelectedGenre(elem.id);
      }
    });
  };

  useEffect(() => {
    const generateListYears = () => {
      const start = 1950;
      const end = 2024;
      let list = [];
      for (let year = start; year <= end; year++) {
        list.push(year.toString());
      }
      return list;
    };
    setYearList(generateListYears());
  }, []);

  const onChangeYear = (event) => {
    setResultSearch([]);
    const yearValue = event.target.value;
    yearList.forEach((elem) => {
      if (elem === yearValue) {
        setSelectedYear(Number(yearValue));
      }
    });
  };

  const changeValueVoteGte = (voteGte) => {
    setVoteGte(voteGte);
  };
  const changeValueVoteLte = (voteLte) => {
    setVoteLte(voteLte);
  };

  const changeSortBy = (value) => {
    setSortBy(value);
  };

  const resetFilters = () => {
    setSelectedGenre("");
    setSelectedYear(0);
    setVoteGte("");
    setVoteLte("");
  };

  const changeActivePage = (page) => {
    setPage(page);
  };

  return (
    <MainLayout>
      <div className="container">
        <div className="search__wrapper">
          <h1>Movies</h1>
          <div className="input-search">
            <SearchInput
              placeholder="Search movie title"
              onUpdateSearch={onUpdateSearch}
            />
            <div className="btn-search">
              <Button onClick={onSearch} color="#9854F6">
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="filters__wrapper">
          <Filters
            data={data}
            genreList={genreList}
            selectedGenre={selectedGenre}
            onChangeGenres={onChangeGenres}
            yearList={yearList}
            selectedYear={selectedYear}
            onChangeYear={onChangeYear}
            voteGte={voteGte}
            changeValueVoteGte={changeValueVoteGte}
            voteLte={voteLte}
            changeValueVoteLte={changeValueVoteLte}
            resetFilters={resetFilters}
          />
        </div>

        <SortBy sortBy={sortBy} changeSortBy={changeSortBy} />
        <div className="cards__wrapper">
          {!emptyResult ? (
            <>
              {resultSearch == false
                ? data.map((item) => (
                    <CardItem {...item} key={item.id} newList={newList} />
                  ))
                : resultSearch.map((item) => (
                    <CardItem {...item} key={item.id} newList={newList} />
                  ))}
              <MyPagination
                activePage={activePage}
                onPageChange={changeActivePage}
                totalPages={totalPages}
                siblings={2}
                total={3}
              />
            </>
          ) : (
            <EmptySearchResult />
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default Home;

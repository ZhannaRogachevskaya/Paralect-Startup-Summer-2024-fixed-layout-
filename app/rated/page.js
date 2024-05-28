"use client";
import { useEffect, useState } from "react";
import { CardItem } from "../../components/CardItem/CardItem";
import { Empty } from "../../components/Empty/Empty";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { MyPagination } from "../../components/MyPagination/MyPagination";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import "./page.css";
import { Button } from "@mantine/core";
const Rated = () => {
  const [listRated, setListRated] = useState([]);
  const [term, setTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [activePage, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    const getRatedFilms = () => {
      const keys = Object.keys(localStorage);
      const filterKeys = keys.filter((key) => key.includes("ratedFilm"));
      const valueRatedFilms = filterKeys.map((key) =>
        JSON.parse(localStorage.getItem(key))
      );
      return valueRatedFilms;
    };

    setListRated(getRatedFilms());
  }, []);
  useEffect(() => {
    const pages = Math.ceil(listRated.length / 20);
    setTotalPage(pages);
  });

  const onUpdateSearch = (term) => {
    setTerm(term.toLowerCase());
  };

  const onSearch = () => {
    setFilterData(
      listRated.filter((item) =>
        item.original_title.toLowerCase().includes(term)
      )
    );
  };

  const changeActivePage = (page) => {
    setPage(page);
  };
  return (
    <MainLayout>
      <div className="container">
        <div className="search__wrapper">
          {listRated == 0 ? (
            <Empty />
          ) : (
            <div className="cards__wrapper">
              <div className="wrapper__header">
                <h1 style={{ marginBottom: "40px" }}>Watched movies</h1>
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
              <div className="cards">
                {filterData == 0
                  ? listRated.map((item, index) => (
                      <CardItem key={index} {...item} />
                    ))
                  : filterData.map((item, index) => (
                      <CardItem key={index} {...item} />
                    ))}
              </div>

              <div className="pagination">
                <MyPagination
                  activePage={activePage}
                  onPageChange={changeActivePage}
                  totalPages={totalPage}
                  siblings={2}
                  total={3}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default Rated;

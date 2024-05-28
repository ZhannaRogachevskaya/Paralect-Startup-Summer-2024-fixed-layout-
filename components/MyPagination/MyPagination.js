"use client";
import "./MyPagination.css";
import { Pagination } from "@mantine/core";
const MyPagination = ({ activePage, onPageChange, totalPages }) => {
  const changeActivePage = (page) => {
    onPageChange(page);
  };
  return (
    <>
      <div className="pagination__wrapper">
        <Pagination
          total={totalPages}
          color="#9854F6"
          active={activePage}
          siblings={0}
          onChange={changeActivePage}
        />
      </div>
    </>
  );
};
export { MyPagination };

"use client";
import { Input } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const SearchInput = ({ onUpdateSearch }) => {
  const [term, setTerm] = useState("");
  const onUpdateValue = (e) => {
    const term = e.target.value;
    setTerm(term);
    onUpdateSearch(term);
  };
  return (
    <>
      <Input
        leftSection={<CiSearch />}
        placeholder="Search movie title"
        value={term}
        onChange={onUpdateValue}
      ></Input>
    </>
  );
};
export { SearchInput };

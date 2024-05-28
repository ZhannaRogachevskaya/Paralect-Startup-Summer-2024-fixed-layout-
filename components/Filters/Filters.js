"use client";
import { NativeSelect, NumberInput, Button } from "@mantine/core";
import { HiChevronDown } from "react-icons/hi2";
import "./Filters.css";

const Filters = ({
  genreList,
  selectedGenre,
  onChangeGenres,
  yearList,
  selectedYear,
  onChangeYear,
  voteGte,
  changeValueVoteGte,
  voteLte,
  changeValueVoteLte,
  resetFilters,
}) => {
  const listGenres = genreList.map((item) => item.name);

  return (
    <div className="filters">
      <NativeSelect
        rightSection={<HiChevronDown />}
        label="Genres"
        data={listGenres}
        mt="md"
        value={selectedGenre}
        onChange={onChangeGenres}
        className="native_select"
      />

      <NativeSelect
        rightSection={<HiChevronDown />}
        label="Release year"
        data={yearList}
        mt="md"
        value={selectedYear}
        onChange={onChangeYear}
        className="native_select"
      />

      <NumberInput
        label="Ratings"
        placeholder="From"
        clampBehavior="strict"
        min={0}
        max={10}
        value={voteGte}
        onChange={changeValueVoteGte}
      />

      <NumberInput
        placeholder="To"
        style={{ marginTop: "47px" }}
        clampBehavior="strict"
        min={0}
        max={10}
        value={voteLte}
        onChange={changeValueVoteLte}
      />

      <Button
        variant="transparent"
        style={{ alignSelf: "flex-end", marginBottom: "0" }}
        onClick={resetFilters}
        color="#7B7C88"
        className="btn_reset"
      >
        Reset filters
      </Button>
    </div>
  );
};
export { Filters };

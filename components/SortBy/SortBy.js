import { NativeSelect } from "@mantine/core";
import { HiChevronDown } from "react-icons/hi2";
import "./SortBy.css";
const SortBy = ({ sortBy, changeSortBy }) => {
  const changeValueSortBy = (event) => {
    const sortByValue = event.currentTarget.value;
    changeSortBy(sortByValue);
  };
  return (
    <NativeSelect
      rightSection={<HiChevronDown />}
      label="Sort by"
      data={[
        "original_title.desc",
        "popularity.desc",
        "revenue.desc",
        "title.desc",
        "primary_release_date.desc",
        "vote_average.desc",
        "vote_count.desc",
      ]}
      mt="md"
      value={sortBy}
      onChange={changeValueSortBy}
      className="sort_by native_select"
    />
  );
};
export { SortBy };

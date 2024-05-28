import Image from "next/image";
import "./EmptySearchResult.css";
const EmptySearchResult = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <Image
          src="/imptySearch.svg"
          alt="search"
          style={{ maxWidth: "100%" }}
          width={310}
          height={252}
        />
        <h3>We don't have such movies, look for another one</h3>
      </div>
    </div>
  );
};
export { EmptySearchResult };

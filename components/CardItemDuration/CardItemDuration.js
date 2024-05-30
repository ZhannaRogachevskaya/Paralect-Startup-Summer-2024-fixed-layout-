import { useEffect, useState } from "react";
import { Line } from "../Line/Line";
import "./CardItemDuration.css";
import Image from "next/image";
import ReactPlayer from "react-player";
import { Loader } from "@mantine/core";
const CardItemDuration = ({ id, updateBreadcrumbs }) => {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const dataId = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/movies/id?id=${id.params.id}`
        );
        if (!response.ok) {
          throw new Error(` ${response.statusText}`);
        }
        const json = await response.json();

        setData(json.data);
        updateBreadcrumbs(json.data.original_title);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    dataId();
  }, []);

  let voteCount = `${data.vote_count}`;
  if (voteCount.length < 3) {
    voteCount = voteCount;
  } else if (voteCount.length >= 3 && voteCount.length < 7) {
    voteCount = "(" + (+voteCount / 1000).toFixed(1) + ")" + "K";
  } else if (voteCount.length >= 7) {
    voteCount = "(" + (+voteCount / 1000000).toFixed(1) + ")" + "M";
  }
  let duration =
    Math.floor(`${data.runtime}` / 60) +
    "h " +
    (`${data.runtime}` - Math.floor(`${data.runtime}` / 60) * 60) +
    "m";

  function getDate(dateStr) {
    const date = new Date(dateStr);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  let release_date = getDate(`${data.release_date}`);
  let budget = Number(`${data.budget}`).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  let revenue = Number(`${data.revenue}`).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return (
    <>
      {loading ? (
        <div className="wrapper__loader">
          <Loader color="violet" type="bars" />
        </div>
      ) : (
        <div className="conteiner__cardItemDuration">
          <div className="card__wrapper">
            <div className="card__container">
              <img
                src={`http://image.tmdb.org/t/p/w154/${data.poster_path}`}
                alt="poster"
                className="poster"
              />
              <div className="card__information">
                <h1>{data.original_title}</h1>
                <div className="release-year">{data.release_date}</div>
                <div className="rating">
                  <Image src="/rating.svg" width={23} height={22} alt="rate" />
                  <div>
                    {Number(`${data.vote_average}`).toFixed(1)} {voteCount}
                  </div>
                </div>
                <div className="duration">
                  <div className="titles">
                    <h3>duration</h3>
                    <h3>Premiere</h3>
                    <h3>Budget</h3>
                    <h3>Gross worldwide</h3>
                    <h3>Genres</h3>
                  </div>
                  <div>
                    <p>{duration}</p>
                    <p>{release_date}</p>
                    <p>{budget}</p>
                    <p>{revenue}</p>
                    <p>{data.genres.map((item) => item.name).join(",")}</p>
                  </div>
                </div>
              </div>
              <div className="add__rated-movies">
                <Image
                  src="/addRated.svg"
                  width={23}
                  height={22}
                  alt="trailer"
                />
              </div>
            </div>
          </div>
          <div className="trailer__wrapper">
            <h2>Trailer</h2>
            <div className="trailer">
              {/* {data.videos.results !== null ? ( */}
              {data.videos.results !== undefined ? (
                <ReactPlayer
                  url={`www.youtube.com/watch?v=${data.videos.results[0].key}`}
                  width="100%"
                  controls={true}
                />
              ) : (
                <h3>Здесь когда-нибудь появится видео...</h3>
              )}
            </div>

            <Line />
            <h2>Description</h2>
            <p>{data.overview}</p>
            <Line />
            <h2>Production</h2>
            <div className="prodaction">
              <div className="prodaction__name">
                {data.production_companies.map((item, index) => (
                  <div className="prod" key={index}>
                    {item.logo_path ? (
                      <img
                        src={`http://image.tmdb.org/t/p/w154/${item.logo_path}`}
                        alt="prod"
                        className="prod"
                      />
                    ) : (
                      <div className="null"></div>
                    )}

                    <div>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export { CardItemDuration };

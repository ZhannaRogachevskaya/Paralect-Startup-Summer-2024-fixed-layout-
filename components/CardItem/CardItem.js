"use client";
import "./CardItem.css";

import Image from "next/image";
import { ModalRating } from "../ModalRating/ModalRating";

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Link from "next/link";
import { useState } from "react";

const CardItem = ({ ...item }, newList) => {
  const [opened, { open, close }] = useDisclosure(false);

  let voteAverage = Number(`${item.vote_average}`).toFixed(1);
  let voteCount = `${item.vote_count}`;
  let release_date = `${item.release_date}`.substring(0, 4);
  const genreArr = item.genre_ids;
  const listGenres = item.newList;

  if (voteCount.length < 3) {
    voteCount = voteCount;
  } else if (voteCount.length >= 3 && voteCount.length < 7) {
    voteCount = "(" + (+voteCount / 1000).toFixed(1) + ")" + "K";
  } else if (voteCount.length >= 7) {
    voteCount = "(" + (+voteCount / 1000000).toFixed(1) + ")" + "M";
  }

  const [valueRating, setValueRating] = useState(
    JSON.parse(localStorage.getItem("ratedFilm - " + item.id))
  );

  const onChangeValueRating = () => {
    setValueRating(JSON.parse(localStorage.getItem("ratedFilm - " + item.id)));
  };

  return (
    <div className="card__wrapper">
      <Link href={`/${item.id}`} className="card__link">
        <div className="card__container">
          <img
            src={`http://image.tmdb.org/t/p/w154/${item.poster_path}`}
            alt="poster"
            className="poster"
          />
          <div className="card__information">
            <h1>{item.original_title}</h1>
            <div className="release-year">{release_date}</div>
            <div className="rating">
              <Image
                src="/rating.svg"
                width={23}
                height={22}
                alt="rating"
                style={{ marginRight: "5px" }}
              />
              <div className="vote_average">{voteAverage}</div> {voteCount}
            </div>
            <div className="genres">
              {genreArr.map((id) => listGenres[id]).join(", ")}
            </div>
          </div>
        </div>
      </Link>
      <div className="add__rated-movies">
        <ModalRating
          opened={opened}
          close={close}
          item={item}
          onChangeValueRating={onChangeValueRating}
        />
        <Button h={45} onClick={open} variant="transparent">
          {valueRating !== null ? (
            <div className="btn__add-rated">
              <div>
                <Image
                  src="/RateActive.svg"
                  width={23}
                  height={22}
                  alt="rating"
                />
              </div>
              <div className="value__rating">{valueRating.rating}</div>
            </div>
          ) : (
            <Image src="/addRated.svg" width={23} height={22} alt="rating" />
          )}
        </Button>
      </div>
    </div>
  );
};
export { CardItem };

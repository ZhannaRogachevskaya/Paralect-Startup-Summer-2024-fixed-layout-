"use client";
import { useState } from "react";
import "./ModalRating.css";

import { Button, Modal, Rating } from "@mantine/core";

const ModalRating = ({ opened, close, item, onChangeValueRating }) => {
  const [rating, setRating] = useState(0);
  const changeValue = (rating) => {
    setRating(rating);
  };

  const onSaveRating = () => {
    localStorage.setItem(
      "ratedFilm - " + item.id,
      JSON.stringify({ ...item, rating })
    );
    onChangeValueRating();
    close();
  };
  const onRemoveRating = () => {
    setRating(0);
    localStorage.removeItem("ratedFilm - " + item.id);
    onChangeValueRating();
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Your rating"
        centered={true}
        radius={8}
      >
        <div className="modal__content">
          <div className="title__movie">{item.original_title}</div>
          <Rating
            defaultValue={0}
            fractions={2}
            count={10}
            value={rating}
            onChange={changeValue}
          />
          <div className="btns_rating">
            <Button size="xs" radius={8} color="#9854F6" onClick={onSaveRating}>
              Save
            </Button>
            <Button
              size="xs"
              radius={8}
              variant="transparent"
              color="#9854F6"
              onClick={onRemoveRating}
            >
              Remove rating
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export { ModalRating };

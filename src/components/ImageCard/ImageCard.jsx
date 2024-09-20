import css from "./ImageCard.module.css";

export default function ImageCard({ value, modalId }) {
  return (
    <>
      <img
        id={value.id}
        src={value.urls.small}
        alt={value.description}
        className={css.img}
        onClick={(e) => modalId(value.id)}
      />
    </>
  );
}

import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ photos, modalId }) {
  return (
    <ul className={css.list}>
      {photos.map((value) => {
        return (
          <li key={value.id} className={css.cart}>
            <ImageCard value={value} modalId={modalId} />
          </li>
        );
      })}
    </ul>
  );
}

import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ moreImages }) {
  const click = () => {
    moreImages();
  };

  return (
    <button type="button" onClick={click} className={css.button}>
      Load more
    </button>
  );
}

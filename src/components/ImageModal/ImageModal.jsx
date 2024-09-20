import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

export default function ImageModal({ isOpen, value, modalOff }) {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={modalOff}>
      <img src={value.urls.full} alt={value.description} className={css.img} />
    </ReactModal>
  );
}

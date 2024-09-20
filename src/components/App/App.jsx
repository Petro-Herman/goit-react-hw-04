import { useEffect, useState } from "react";
import css from "./App.module.css";
import { fetchPhoto } from "../../httpkey/httpkey";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [modal, setModal] = useState("");

  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getPhoto() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchPhoto(topic, page);
        setPhotos((prevState) => [...prevState, ...res.photo]);
        setTotalPages(res.totalPages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getPhoto();
  }, [page, topic]);

  function search(text) {
    setPhotos([]);
    setTopic(text);
    setPage(1);
  }

  function more() {
    setPage(page + 1);
  }

  function modalOn(id) {
    setModal(id);
  }

  function modalOff() {
    setModal("");
  }

  return (
    <div className={css.container}>
      <SearchBar onSubmit={search} />
      <ImageGallery photos={photos} modalId={modalOn} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {totalPages > page && photos.length > 0 && !loading && (
        <LoadMoreBtn moreImages={more} />
      )}
      {modal && (
        <ImageModal
          isOpen={modal}
          value={photos[photos.findIndex((el) => el.id === modal)]}
          modalOff={modalOff}
        />
      )}
    </div>
  );
}

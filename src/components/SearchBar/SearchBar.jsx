import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const res = event.target.elements.text.value;
    if (res.trim() === "") {
      toast("Enter the corect value!");
      return;
    }
    onSubmit(res);
    event.target.elements.text.value = "";
  };

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search images and photos"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
}

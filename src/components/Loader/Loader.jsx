import { RotatingSquare } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.load}>
      <RotatingSquare
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="rotating-square-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

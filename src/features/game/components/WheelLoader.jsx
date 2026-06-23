import gordaIcon from "../../../assets/images/obesidad.svg";
import pecesIcon from "../../../assets/images/peces.svg";
import cacaIcon from "../../../assets/images/caca.svg";
import { useState, useEffect } from "react";

import "../styles/WheelLoader.css";
import LoaderColumn from "./LoaderColum.jsx";

function WheelLoader() {
  const [spin1, setSpin1] = useState(false);
  const [spin2, setSpin2] = useState(false);
  const [spin3, setSpin3] = useState(false);

  useEffect(() => {
    setTimeout(() => setSpin1(true), 400);
    setTimeout(() => setSpin2(true), 600);
    setTimeout(() => setSpin3(true), 800);
  }, []);

  return (
    <div className="loader">
      <LoaderColumn icon={gordaIcon} className={spin1 ? "scrollDown" : ""} />

      <LoaderColumn icon={pecesIcon} className={spin2 ? "scrollUp" : ""} />

      <LoaderColumn icon={cacaIcon} className={spin3 ? "scrollDown" : ""} />
    </div>
  );
}

export default WheelLoader;

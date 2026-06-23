import shotActiveIcon from "../../../../assets/images/shot-glass.svg";
import shotInactiveIcon from "../../../../assets/images/shot-glass-clean.svg";

function SidePanelLives({ playerId, shots, maxShots }) {
  return (
    <div className="statBlock">
      <p>Vidas (shots)</p>
      <div className="shotGrid" aria-label="Vidas restantes">
        {Array.from({ length: maxShots ?? shots }).map((_, index) => {
          const isAlive = index < shots;

          return (
            <span
              key={`${playerId}-shot-${index}`}
              className={`shotCircle ${isAlive ? "shotActive" : "shotInactive"}`}
              aria-hidden="true"
            >
              <img
                src={isAlive ? shotActiveIcon : shotInactiveIcon}
                alt=""
                className="shotIcon"
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default SidePanelLives;

import WheelLoader from "./WheelLoader";

function WinnerCard({ winner, isRolling }) {
  return (
    <div id="marcador">
      <div className="cardResult">
        <b></b>

        <div className="content">{isRolling ? <WheelLoader /> : winner}</div>
      </div>
    </div>
  );
}

export default WinnerCard;

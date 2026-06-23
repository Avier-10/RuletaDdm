import "../styles/ActiveEffects.css";

function ActiveEffects({ effects, onEffectFailed }) {
  if (effects.length === 0) return null;

  return (
    <div className="active-effects">
      {effects.map((effect) => (
        <div
          key={effect.instanceId}
          className={`effect-badge ${
            effect.remainingTurns === 1 ? "warning" : ""
          }`}
        >
          <div className="effect-player">{effect.playerName}</div>

          <p>{effect.text}</p>

          <span>
            {effect.remainingTurns} turno
            {effect.remainingTurns > 1 ? "s" : ""}
          </span>

          <button
            className="effect-fail-btn"
            onClick={() => onEffectFailed(effect)}
          >
            Fallado(-1 vida)
          </button>
        </div>
      ))}
    </div>
  );
}

export default ActiveEffects;

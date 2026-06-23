import JokerToken from "../JokerToken.jsx";

function SidePanelJokers({ playerId, jokers }) {
  return (
    <div className="statBlock">
      <p>Comodines</p>
      <div className="jokerGrid">
        {jokers.map((joker) => (
          <JokerToken
            key={`${playerId}-joker-${joker.type}`}
            kind={joker.type}
            used={joker.used}
            interactive={false}
          />
        ))}
      </div>
    </div>
  );
}

export default SidePanelJokers;

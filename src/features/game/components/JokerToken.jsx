import { getJokerDefinition } from "../data/jokers.js";

function JokerToken({
  kind,
  used = false,
  interactive = false,
  onClick,
  className = "",
}) {
  const joker = getJokerDefinition(kind);
  if (!joker) return null;

  const classes = [
    "jokerToken",
    used ? "jokerTokenUsed" : "",
    interactive ? "jokerTokenInteractive" : "jokerTokenStatic",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="jokerTokenHalo" aria-hidden="true" />
      <img src={joker.icon} alt="" className="jokerTokenIcon" />
      <span className="jokerTokenLabel">{joker.label}</span>
    </>
  );

  if (!interactive) {
    return (
      <span
        className={classes}
        title={joker.description}
        aria-label={joker.label}
      >
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={used}
      aria-label={joker.label}
      title={joker.description}
    >
      {content}
    </button>
  );
}

export default JokerToken;
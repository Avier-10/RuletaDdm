import { useState } from "react";
import JokerToken from "../JokerToken.jsx";
import ModalShell from "./ModalShell.jsx";

function ResultModal({
  open,
  content,
  player,
  onClose,
  onSkip,
  onTruth,
  onDare,
  onUseJoker,
  onCompleteChallenge,
}) {

  const [sequenceIndex, setSequenceIndex] = useState(0);

  if (!open || !content) return null;

  const sequenceSteps = Array.isArray(content.steps) ? content.steps : [];
  const safeSequenceIndex =
    content.mode === "sequence" && sequenceSteps.length > 0
      ? Math.min(sequenceIndex, sequenceSteps.length - 1)
      : 0;

  const currentContent =
    content.mode === "sequence" ? sequenceSteps[safeSequenceIndex] : content;
  const data = currentContent?.data;
  const showJokers =
    currentContent?.mode === "truth" || currentContent?.mode === "dare";

  if (content.mode === "sequence" && !currentContent?.data) {
    return (
      <ModalShell title="Verdad y Reto" className="modal--result">
        <p>No se pudo cargar el contenido. Cerrá y volvé a girar.</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Cerrar</button>
        </div>
      </ModalShell>
    );
  }
  
  const handleSkip = () => {
    onSkip?.();

    if (
      content.mode === "sequence" &&
      safeSequenceIndex < sequenceSteps.length - 1
    ) {
      setSequenceIndex((prev) => prev + 1);
      return;
    }

    onClose();
  };

  const handleComplete = () => {

    if (data?.porTurno) {
      onCompleteChallenge?.(currentContent, player);
    }

    if (
      content.mode === "sequence" &&
      safeSequenceIndex < sequenceSteps.length - 1
    ) {
      setSequenceIndex((prev) => prev + 1);
      return;
    }

    onClose();
  };

  const handleTruth = () => {
    setSequenceIndex(0);
    onTruth?.();
  };

  const handleDare = () => {
    setSequenceIndex(0);
    onDare?.();
  };

  const handleUseJoker = (jokerType) => {
    onUseJoker?.(jokerType, currentContent, sequenceIndex);
  };

  const renderChoice = () => (
    <>
      <p className="modal-description">Elegi entre verdad o reto.</p>
      <div className="modal-buttons">
        <button className="modal-btn modal-btn-truth" onClick={handleTruth}>
          Verdad
        </button>

        <button className="modal-btn modal-btn-dare" onClick={handleDare}>
          Reto
        </button>
      </div>
    </>
  );

  const renderResult = () => (
    <>
      <p className="modal-playerTag">
        Turno de{" "}
        <span className={`playerName playerName-${player?.id}`}>
          {player?.name ?? "Jugador"}
        </span>
      </p>
      <p className="modal-text">{data.text}</p>
      {data?.image && (
        <img src={data.image} alt="contenido" className="modal-image" />
      )}
      {data?.video && (
        <div className="media-container">
          <video controls className="modal-video">
            <source src={data.video} type="video/mp4" />
          </video>
        </div>
      )}
      {showJokers && player?.jokers?.length > 0 && (
        <div className="modalJokerSection">
          <p>Comodines</p>
          <div className="modalJokerRow">
            {player.jokers.map((joker) => (
              <JokerToken
                key={`${player.id}-modal-${joker.type}`}
                kind={joker.type}
                used={joker.used}
                interactive
                onClick={() => handleUseJoker(joker.type)}
              />
            ))}
          </div>
        </div>
      )}
      <div className="modal-buttons">
        <button className="modal-btn modal-btn-skip" onClick={handleSkip}>
          Saltar
        </button>

        <button
          className={`modal-btn ${
            content.mode === "sequence" &&
            safeSequenceIndex < sequenceSteps.length - 1
              ? "modal-btn-next"
              : "modal-btn-complete"
          }`}
          onClick={handleComplete}
        >
          {content.mode === "sequence" &&
          safeSequenceIndex < sequenceSteps.length - 1
            ? "Siguiente"
            : "Completado"}
        </button>
      </div>
    </>
  );

  if (content.mode === "choice") {
    return (
      <ModalShell title="Verdad o Reto" className="modal--result">
        {renderChoice()}
      </ModalShell>
    );
  }

  const resultTitle =
    content.mode === "sequence"
      ? currentContent?.mode === "truth"
        ? "Verdad"
        : "Reto"
      : content.mode === "truth"
        ? "Verdad"
        : "Reto";

  return (
    <ModalShell title={resultTitle} className="modal--result">
      {renderResult()}
    </ModalShell>
  );
}

export default ResultModal;
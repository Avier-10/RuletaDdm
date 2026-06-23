import WheelSection from "./WheelSection.jsx";
import ResultModal from "./modals/ResulModal.jsx";
import ActiveEffects from "./ActiveEffects.jsx";
import useWheelController from "../hooks/useWheelController.js";


function Wheel({
  sections,
  setWinner,
  setIsRolling,
  currentTurn,
  playerCount,
  activePlayer,
  onSpinStart,
  onSpinComplete,
  onSkip,
  onUseJoker,
  onRedirectTurn,
  onEffectFailed,
}) {
  const {
    activeEffects,
    handleCloseModal,
    handleDare,
    handleSpin,
    handleTruth,
    handleUseJoker,
    modalInstanceKey,
    spinDuration,
    processedSections,
    rotation,
    selectedContent,
    showModal,
    spinning,
    registerActiveEffect,
    handleEffectFailed,
  } = useWheelController({
    sections,
    currentTurn,
    playerCount,
    onSpinStart,
    onSpinComplete,
    onUseJoker,
    onRedirectTurn,
    setWinner,
    setIsRolling,
    onEffectFailed,
  });

  return (
    <div id="ruleta">
      <ActiveEffects
        effects={activeEffects}
        onEffectFailed={handleEffectFailed}
      />
      <div className="wheelPointer" />
      <svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        id="opcionesContainer"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: `transform ${spinDuration}ms cubic-bezier(0.1, 0, 0.18, 0.99)`,
        }}
      >
        {processedSections.map((section) => (
          <WheelSection key={section.id} section={section} />
        ))}
      </svg>

      <ResultModal
        key={modalInstanceKey}
        open={showModal}
        content={selectedContent}
        player={activePlayer}
        onClose={handleCloseModal}
        onSkip={onSkip}
        onTruth={handleTruth}
        onDare={handleDare}
        onUseJoker={handleUseJoker}
        onCompleteChallenge={registerActiveEffect}
      />

      <button
        type="button"
        id="sortear"
        className="button"
        onClick={handleSpin}
        disabled={spinning}
        aria-disabled={spinning}
      >
        <span className="button-top">GIRAR</span>
        <span className="button-bottom" aria-hidden="true" />
        <span className="button-base" aria-hidden="true" />
      </button>
    </div>
  );
}

export default Wheel;
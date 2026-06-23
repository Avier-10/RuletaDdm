import { useEffect, useMemo, useRef, useState } from "react";
import SoundWheel from "../../../assets/audio/ruleta.mp3";
import SoundResult from "../../../assets/audio/selected.mp3";
import { spinWheel } from "../logic/spinlogic.js";
import { normalizeProbabilities } from "../logic/wheelHelpers.js";
import {
  getContentFromType,
  getDare,
  getOppositeContent,
  getSequenceContent,
  getTruth,
} from "../logic/questionManager.js";

const SPIN_DURATION = 5000;
const AUDIO_FADE_INTERVAL = 100;

function useWheelController({
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
}) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [activeEffects, setActiveEffects] = useState([]);
  const [modalInstanceKey, setModalInstanceKey] = useState(0);

  const spinAudio = useRef(null);
  const resultAudio = useRef(null);
  const fadeInterval = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    spinAudio.current = new Audio(SoundWheel);
    spinAudio.current.loop = true;
    spinAudio.current.volume = 1;

    resultAudio.current = new Audio(SoundResult);
    resultAudio.current.volume = 1;

    return () => {
      clearInterval(fadeInterval.current);
      clearTimeout(timeoutRef.current);

      if (spinAudio.current) {
        spinAudio.current.pause();
        spinAudio.current.currentTime = 0;
      }
    };
  }, []);

  const processedSections = useMemo(() => {
    const normalizedSections = normalizeProbabilities(sections);

    return normalizedSections.map((section, index, array) => {
      const degree = array
        .slice(0, index)
        .reduce((sum, current) => sum + current.normalized * 360, 0);
      const size = section.normalized * 360;

      return {
        ...section,
        degree,
        size,
      };
    });
  }, [sections]);

  const fadeOutAudio = (duration) => {
    clearInterval(fadeInterval.current);

    const steps = duration / AUDIO_FADE_INTERVAL;
    const volumeStep = 1 / steps;

    fadeInterval.current = setInterval(() => {
      if (!spinAudio.current) return;

      const nextVolume = spinAudio.current.volume - volumeStep;
      if (nextVolume <= 0) {
        spinAudio.current.volume = 0;
        spinAudio.current.pause();
        spinAudio.current.currentTime = 0;
        clearInterval(fadeInterval.current);
        return;
      }

      spinAudio.current.volume = nextVolume;
    }, AUDIO_FADE_INTERVAL);
  };

  const registerActiveEffect = (content, player) => {
    if (!content?.data?.porTurno) return;

    setActiveEffects((prev) => [
      ...prev,
      {
        instanceId: crypto.randomUUID(),
        playerName: player.name,
        playerId: player.id,
        text: content.data.text,
        remainingTurns: content.data.turns,
        justActivated: true,
      },
    ]);
  };

 const handleEffectFailed = (effect) => {
   onEffectFailed?.(effect.playerId);

   setActiveEffects((prev) =>
     prev.filter((e) => e.instanceId !== effect.instanceId),
   );
 };

  const handleSpin = () => {
    if (spinning || !spinAudio.current || processedSections.length === 0) {
      return;
    }

    onSpinStart?.();

    spinAudio.current.currentTime = 0;
    spinAudio.current.volume = 1;
    spinAudio.current.play().catch(() => {});

    setActiveEffects((prev) =>
      prev
        .map((effect) => {
          if (effect.justActivated) {
            return {
              ...effect,
              justActivated: false,
            };
          }

          return {
            ...effect,
            remainingTurns: effect.remainingTurns - 1,
          };
        })
        .filter((effect) => effect.remainingTurns > 0),
    );

    setSpinning(true);
    setIsRolling(true);

    const spinResult = spinWheel(processedSections);

    setRotation((prevRotation) => {
      const currentAngle = prevRotation % 360;
      return prevRotation + (spinResult.rotation - currentAngle);
    });

    fadeOutAudio(SPIN_DURATION);

    timeoutRef.current = setTimeout(() => {
      setSpinning(false);
      setIsRolling(false);

      const content =
        spinResult.winner.label === "F"
          ? getSequenceContent()
          : getContentFromType(spinResult.winner.type);

      setWinner(spinResult.winner.Tag);

      setTimeout(() => {
        resultAudio.current?.play().catch(() => {});
      }, 150);

      setTimeout(() => {
        setSelectedContent(content);
        setModalInstanceKey((prev) => prev + 1);
        setShowModal(true);
      }, 450);
    }, SPIN_DURATION);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContent(null);
    onSpinComplete?.();
  };

  const handleTruth = () => {
    const content = {
      mode: "truth",
      data: getTruth(),
    };

    setSelectedContent(content);
  };

  const handleDare = () => {
    const content = { mode: "dare", data: getDare() };

    setSelectedContent(content);
  };

  const handleUseJoker = (jokerType, currentContent, sequenceIndex) => {
    const activeContent = currentContent ?? selectedContent;
    if (!activeContent || activeContent.mode === "choice") return;

    onUseJoker?.(currentTurn, jokerType);

    if (jokerType === "reflect") {
      const targetIndex = (currentTurn + 1) % playerCount;
      onRedirectTurn?.(targetIndex);
      return;
    }

    if (jokerType === "swap") {
      if (activeContent.mode !== "truth" && activeContent.mode !== "dare") {
        return;
      }

      const swapped = getOppositeContent(activeContent.mode);
      if (!swapped) return;

      if (selectedContent?.mode === "sequence") {
        setSelectedContent((prev) => {
          if (!prev || prev.mode !== "sequence") return prev;

          const nextSteps = prev.steps.map((step, index) =>
            index === sequenceIndex ? swapped : step,
          );

          return {
            ...prev,
            steps: nextSteps,
          };
        });
        return;
      }

      setSelectedContent(swapped);
    }
  };

  return {
    activeEffects,
    handleCloseModal,
    handleDare,
    handleSpin,
    handleTruth,
    handleUseJoker,
    modalInstanceKey,
    spinDuration: SPIN_DURATION,
    processedSections,
    rotation,
    selectedContent,
    showModal,
    spinning,
    setIsRolling,
    registerActiveEffect,
    handleEffectFailed,
  };
}

export default useWheelController;

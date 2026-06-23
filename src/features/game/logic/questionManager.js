import { truths } from "../data/truths.js";
import { dares } from "../data/dares.js";
import { getRandomQuestion } from "./questionsLogic";

export function getTruth() {
  return getRandomQuestion(truths);
}

export function getDare() {
  return getRandomQuestion(dares);
}

export function getContentFromType(type) {
  switch (type) {
    case "truth":
      return {
        mode: "truth",
        data: getTruth(),
      };

    case "dare":
      return {
        mode: "dare",
        data: getDare(),
      };

    case "both":
      return {
        mode: "choice",
      };

    default:
      return null;
  }
}

export function getOppositeContent(type) {
  if (type === "truth") {
    return {
      mode: "dare",
      data: getDare(),
    };
  }

  if (type === "dare") {
    return {
      mode: "truth",
      data: getTruth(),
    };
  }

  return null;
}

export function getSequenceContent() {
  return {
    mode: "sequence",
    steps: [
      { mode: "truth", data: getTruth() },
      { mode: "dare", data: getDare() },
    ],
  };
}

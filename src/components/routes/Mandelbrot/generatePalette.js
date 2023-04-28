import {
  generateColorLinear,
  generateColorLogarithmic,
  generateColorSmoothed,
} from "./palettes";

// Générer la palette de couleurs
export const generatePalette = ({ maxIterations, colorMethod, cutOffSet }) => {
  let palette = [];
  switch (colorMethod) {
  case "LINEAR":
    palette = getPalette({
      maxIterations,
      cutOffSet,
      colorMethod: generateColorLinear,
    });
    break;
  case "LOG":
    palette = getPalette({
      maxIterations,
      cutOffSet,
      colorMethod: generateColorLogarithmic,
    });
    break;
  case "SMOOTH":
    palette = getPalette({
      maxIterations,
      cutOffSet,
      colorMethod: generateColorSmoothed,
    });
    break;
  default:
    throw new Error(`Unsupported color method: ${colorMethod}`);
  }
  return palette;
};

function getPalette({ maxIterations, cutOffSet, colorMethod }) {
  const palette = [];
  for (let i = 0; i < maxIterations; i++) {
    palette[i] = colorMethod(i - cutOffSet, maxIterations);
  }
  return palette;
}

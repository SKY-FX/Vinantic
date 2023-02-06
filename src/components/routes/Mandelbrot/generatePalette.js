import { generateColorLinear, generateColorLogarithmic, generateColorSmoothed } from "./palettes";

// Générer la palette de couleurs
export const generatePalette = ({ maxIterations, colorMethod }) => {
  let palette = [];
  switch (colorMethod) {
  case 'LINEAR':
    palette = getPalette({ maxIterations, colorMethod: generateColorLinear });
    break;
  case 'LOG':
    palette = getPalette({ maxIterations, colorMethod: generateColorLogarithmic });
    break;
  case 'SMOOTH':
    palette = getPalette({ maxIterations, colorMethod: generateColorSmoothed });
    break;
  default:
    throw new Error(`Unsupported color method: ${colorMethod}`);
  }
  return palette;
}

function getPalette({ maxIterations, colorMethod }) {
  const palette = [];
  for (let i = 0; i < maxIterations; i++) {
    palette[i] = colorMethod(i, maxIterations);
  }
  return palette;
}
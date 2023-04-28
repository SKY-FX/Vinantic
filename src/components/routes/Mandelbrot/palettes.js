export const generateColorLinear = (iteration, maxIterations) => {
  const ratio = iteration / maxIterations;
  const color = ratio * 255;
  return [color, color, 0];
};

export const generateColorLogarithmic = (iteration, maxIterations) => {
  const logValue = Math.log(iteration) / Math.log(maxIterations);
  const color = logValue * 255;
  return [color, color, color];
};

export const generateColorSmoothed = (iteration, maxIterations) => {
  const logValue = Math.log(iteration + 1) / Math.log(maxIterations);
  const color = logValue * 255;
  return [color, color, color];
};

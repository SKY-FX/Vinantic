import { map, range } from "ramda";

export const generatePixels = ({ maxIterations, escapeRadius, step, selectedRange }) => {
  // Générer la plage de nombres pour les coordonnées x et y
  const createList = (A, B, pas) => map(val => A + val * pas, range(0, Math.ceil((B - A) / pas)));
  const xRange = createList(selectedRange.xmin, selectedRange.xmax, step);
  const yRange = createList(selectedRange.ymin, selectedRange.ymax, step);

  // Calcule les pixels de l'image de Mandelbrot
  return map(x => map(y => {
    let real = x;
    let imaginary = y;
    let iterations = 0;

    while (iterations < maxIterations && real * real + imaginary * imaginary < escapeRadius) {
      const realTemp = real * real - imaginary * imaginary + x;
      imaginary = 2 * real * imaginary + y;
      real = realTemp;
      iterations++;
    }

    return iterations;
  }, yRange), xRange);
}

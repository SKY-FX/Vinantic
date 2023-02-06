import React, { useState, useEffect, useRef } from 'react'
import { generatePixels } from './generatePixels'
import { isNotEmpty, isNotNil, isTrue } from 'ramda-adjunct';
import { generatePalette } from './generatePalette';
import drawImage from './drawImage';
import { compose, find, isEmpty, map, propEq, propOr } from 'ramda';

// La Vallée de Mandelbrot (-1.7487, 0.0064)
// Le Dragon de Mandelbrot (-1.74, 0.002)
// La Cardioïde de Mandelbrot (0.25, 0)
// Le Bloc Minimal (0.25, 0.5)
// Le Satellite de Mandelbrot (-0.75, 0.1)

const MandelbrotImage = () => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [pixels, setPixels] = useState([]);
  const [maxIterations, setMaxIterations] = useState(100);
  const [escapeRadius, setEscapeRadius] = useState(2.2);
  const [step, setStep] = useState(0.001);
  const [cutOffSet, setcutOffSet] = useState(10);
  const [selectedRange, setSelectedRange] = useState({
    xmin: -2,
    xmax: 2,
    ymin: -2,
    ymax: 2
  });

  const RangesOptions = [
    {
      value: {
        xmin: -1.17,
        xmax: -1.14,
        ymin: -0.34,
        ymax: -0.28
      },
      label: 'Range 1'
    },
    {
      value: {
        xmin: -2,
        xmax: 2,
        ymin: -2,
        ymax: 2
      },
      label: 'Range 2'
    },
    {
      value: {
        xmin: -1.28,
        xmax: -1.05,
        ymin: -0.4,
        ymax: -0.14
      },
      label: 'Range 3'
    },
    {
      value: {
        xmin: -1.5,
        xmax: 0.55,
        ymin: -1.1,
        ymax: 1.1
      },
      label: 'Range 4'
    }];

  const canvasRef = useRef(null);
  const canvas = canvasRef.current;

  useEffect(() => {
    if (isTrue(true)) {
      const getPixels = () => {
        // Implémentez l'algorithme de Mandelbrot ici en utilisant les fonctions de Ramda pour traiter les données
        console.info('COUCOU', selectedRange);
        const createdPixels = generatePixels({ maxIterations, escapeRadius, step, selectedRange });
        setPixels(createdPixels);
      }
      getPixels();
    }
  }, [maxIterations, escapeRadius, step, selectedRange])

  useEffect(() => {
    if (isNotEmpty(pixels) && (isNotNil(canvas))) {
      const ctx = canvas.getContext('2d');
      canvas.style.backgroundColor = "black";
      canvas.width = pixels[0].length;
      canvas.height = pixels.length;

      // Générer la palette de couleurs
      const palette = generatePalette({ maxIterations, colorMethod: 'LINEAR' });
      console.info('PIXELS', { pixels, palette });
      drawImage({ ctx, pixels, palette, cutOffSet });
      setIsWaiting(false);
      console.info('SUCCESS', { pixels, palette });
    }
  }, [pixels, canvasRef, maxIterations, cutOffSet])

  return (
    <>
      <div>
        <form>
          <label>
            Max Iterations:
            <input
              type="number"
              value={maxIterations}
              onChange={event => setMaxIterations(event.target.value)}
            />
          </label>
          <br />
          <label>
            Escape Radius:
            <input
              type="number"
              value={escapeRadius}
              onChange={event => setEscapeRadius(event.target.value)}
            />
          </label>
          <br />
          <label>
            Step:
            <input
              type="number"
              value={step}
              onChange={event => setStep(event.target.value)}
            />
          </label>
          <br />
          <label>
            Cut Off Set:
            <input
              type="number"
              value={cutOffSet}
              onChange={event => setcutOffSet(event.target.value)}
            />
          </label>
          <br />
          { RangesOptions && <label>
            Select Range:
            <select value={selectedRange} onChange={event => {

              const rangeToSet = compose(
                propOr({}, 'value'),
                find(propEq('label', event.target.value))
              )(RangesOptions);

              console.info('RRRRR', rangeToSet);
              setSelectedRange(rangeToSet);
            }}>
              {
                map((range, index) => (
                  <option key={`range-${index}-${range.label}`} value={range.label}>
                    {/* {`xMin: ${range.value.xmin} xMax: ${range.value.xmax} yMin: ${range.value.ymin} yMax: ${range.value.ymax}`} */}
                    {range.label}
                  </option>
                ))(RangesOptions)
              }
            </select>
          </label> }
        </form>
      </div>

      <div className='flex flex-col w-full'>
        { isWaiting && <p className='font-xl text-red-600 mt-5'>En cours de chargement...</p>}
        <canvas ref={canvasRef} />
      </div>
    </>
  )
}

export default MandelbrotImage

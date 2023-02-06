const drawImage = ({ ctx, pixels, palette, cutOffSet }) => {
  const width = pixels[0].length;
  const height = pixels.length;
  const paletteLength = palette.length;

  // Définir le background du canvas
  ctx.fillStyle = 'rgb(255, 0, 0)';
  ctx.fillRect(0, 0, width, height);

  // Précalculer les couleurs
  const colors = [];
  for (let i = 0; i < paletteLength; i++) {
    const color = palette[i];
    colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
  }

  // Créer un objet ImageData pour chaque ligne
  const lineImages = [];
  for (let y = 0; y < height; y++) {
    const lineImageData = ctx.createImageData(width, 1);
    const lineData = lineImageData.data;
    for (let x = 0; x < width; x++) {
      const iteration = pixels[y][x];

      if (iteration <= cutOffSet) continue;

      const color = palette[iteration % paletteLength];
      const index = x * 4;
      lineData[index] = color[0];
      lineData[index + 1] = color[1];
      lineData[index + 2] = color[2];
      lineData[index + 3] = 255;
    }
    lineImages.push(lineImageData);
  }

  // Dessiner les lignes sur le canvas
  for (let y = 0; y < height; y++) {
    ctx.putImageData(lineImages[y], 0, y);
  }
};

export default drawImage;
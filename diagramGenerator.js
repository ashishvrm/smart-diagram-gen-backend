function generateDiagramSVG(text) {
  // This is a very basic example. Replace this with your actual diagram generation logic.
  const words = text.split(' ');
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="${words.length * 30 + 20}">`;
  
  words.forEach((word, index) => {
    svg += `<text x="10" y="${index * 30 + 20}" fill="black">${word}</text>`;
  });
  
  svg += '</svg>';
  return svg;
}

module.exports = { generateDiagramSVG };

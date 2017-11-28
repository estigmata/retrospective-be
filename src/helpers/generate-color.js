'use strict';

function generateColor (colors) {
  const newColor = 10 * (Math.floor(Math.random() * ((370 / 10))));
  const colorFound = colors.find(color => color === newColor);
  if (colorFound || colorFound === 0) {
    return generateColor(colors);
  }
  return newColor;
}

module.exports = generateColor;

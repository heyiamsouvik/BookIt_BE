// utils/generateRefId.js
function generateRefId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = () => numbers[Math.floor(Math.random() * numbers.length)];

  const ref =
    randomLetter() + randomLetter() + randomLetter() + // 3 letters
    randomNumber() + randomNumber() +                 // 2 numbers
    "&" +                                             // static symbol
    randomLetter() + randomLetter();                  // 2 letters

  return ref;
}

module.exports = generateRefId;

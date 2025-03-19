function CaculateClosestNumber(number, numberList) {
  if(!Array.isArray(numberList)) return;
  return numberList.reduce((closestNumber, currentNumber) => {
    const distanceToClosestNumber = Math.abs(number - closestNumber);
    const distanceToCurrentNumber = Math.abs(number - currentNumber);

    if (distanceToCurrentNumber < distanceToClosestNumber) {
      return currentNumber;
    } else {
      return closestNumber;
    }
  });
}

export default CaculateClosestNumber;
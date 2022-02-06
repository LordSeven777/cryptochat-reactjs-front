// Returns the Decimal of a number
const getDecimal = (nb) => Math.floor(nb / 10) * 10;

// Gets a random value
const getRandom = () => Math.random() * 100 * Math.random() * 100 + Math.random() * 1000;

export { getDecimal, getRandom };

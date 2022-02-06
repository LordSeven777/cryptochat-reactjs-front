// Appends an "s" to a word if it should be plural
const pluralize = (word, isPlural) => `${word}${isPlural ? "s" : ""}`;

export default pluralize;

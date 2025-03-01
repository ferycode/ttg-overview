'use strict';

const findFormula = (array, target) => {
  const operators = ['+', '-', '*'];
  const n = array.length;
  const results = [];

  const generateFormula = (index, formula) => {
    if (index === n) {
      if (eval(formula) === target) {
        results.push(formula);
      }
      return;
    }

    for (const operator of operators) {
      generateFormula(index + 1, `${formula}${operator}${array[index]}`);
    }
  }

  generateFormula(1, `${array[0]}`);
  return results;
}

// Test case
console.log(findFormula([1, 4, 5, 6], 16));
console.log(findFormula([1, 4, 5, 6], 18));
console.log(findFormula([1, 4, 5, 6], 50)); 
'use strict';

const findNumber = (array) => {
  array.sort((a, b) => a - b); // urutkan array secara ascending
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] + 1 !== array[i + 1]) {
      return array[i] + 1; // return angka yang hilang
    }
  }
  return -1; // angka tidak ditemukan
}

// Test cases
console.log(findNumber([3, 0, 2, 4])); // 1
console.log(findNumber([3106, 3102, 3104, 3105, 3107])); // 3103
console.log(findNumber([10345, 10346, 10348, 10349, 10350])); // 10347

const parity = number => new Promise((resolve, reject) => {
    if (number % 2 === 0) reject("even");
    else resolve("odd");
});

module.exports = parity;

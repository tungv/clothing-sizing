const getJeansMeasurements = require('../jeansMessurements');

describe("Jeans measurements", () => {
  test("test 1", () => {
    const input = [
      { x: 315, y: 33 },
      { x: 195, y: 28 },
      { x: 163, y: 42 },
      { x: 152, y: 454 },
      { x: 177, y: 479 },
      { x: 196, y: 478 },
      { x: 243, y: 168 },
      { x: 285, y: 316 },
      { x: 304, y: 468 },
      { x: 326, y: 474 },
      { x: 341, y: 457 },
      { x: 344, y: 333 }
    ];

    getJeansMeasurements(input);
  });
});

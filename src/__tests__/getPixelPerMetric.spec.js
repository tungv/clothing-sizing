const cv = require('opencv');
const { getContoursWithMutationToImage } = require('../createContoursStream');
const { getLeftMostContour, getPPM } = require('../getPixelPerMetric');

describe('getLeftMostContour', () => {
  test('test 1', (done) => {
    cv.readImage('./assets/jean_with_ref.jpg', (err, image) => {
      const contours = getContoursWithMutationToImage(image);
      const leftmost = getLeftMostContour(contours);
      expect(leftmost).toMatchSnapshot();
      done();
    })
  })
});

describe('getPPM', () => {
  test('test 1', () => {
    const refRect = {
      "height": 161,
      "width": 161,
      "x": 33,
      "y": 543,
    }
    expect(getPPM(refRect, .5, .5)).toMatchSnapshot();
  })

  test('test 2', () => {
    const refRect = {
      "height": 161,
      "width": 181,
      "x": 33,
      "y": 543,
    }
    expect(() => getPPM(refRect, .5, .5)).toThrowErrorMatchingSnapshot();
  })
});

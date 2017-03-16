const cv = require("opencv");
const uuid = require("uuid");

const getJeansMeasurements = require('./jeansMessurements');

const WHITE = [255, 255, 255];
const GREEN = [0, 255, 0];
const RED = [0, 0, 255];
const lowThresh = 0;
const highThresh = 150;
const iterations = 2;
const thickness = 1;

const root = process.env.NOW_URL || "http://localhost:3000";

module.exports = (createInputStream, numberOfContours) => {
  return new Promise((resolve, reject) => {
    const s = new cv.ImageDataStream();
    const id = uuid.v4();

    s.on("load", image => {
      const width = image.width();
      const height = image.height();
      const big = new cv.Matrix(height, width);

      image.convertGrayscale();
      image.gaussianBlur([3, 3]);

      image.canny(lowThresh, highThresh);
      image.dilate(iterations);

      const contours = image.findContours();

      let largestContourImg;
      let largestArea = 0;
      let largestAreaIndex;

      const contourSizes = [];

      for (let i = 0; i < contours.size(); i++) {
        contourSizes.push({ i, area: contours.area(i) });
      }

      contourSizes.sort((a, b) => b.area - a.area);
      const biggest = contourSizes.slice(0, numberOfContours);

      biggest.forEach(item => {
        const { i } = item;
        let points = [];

        let arcLength = contours.arcLength(i, true);
        contours.approxPolyDP(i, arcLength * 0.0025, true);
        big.drawContour(contours, i, GREEN, thickness);
        let rect = contours.minAreaRect(i);
        for (let i = 0; i < 4; i++) {
          big.line(
            [rect.points[i].x, rect.points[i].y],
            [rect.points[(i + 1) % 4].x, rect.points[(i + 1) % 4].y],
            RED,
            1
          );
        }

        for (var c = 0; c < contours.cornerCount(i); ++c) {
          points.push(contours.point(i, c));
        }

        // mutation!
        item.measurements = getJeansMeasurements(points);
      });

      big.save(`./outputs/${id}.contours.jpg`);

      resolve({
        uri: `${root}/outputs/${id}.contours.jpg`,
        id,
        total: contours.size(),
        items: biggest
      });
    });

    createInputStream().pipe(s);
  });
};

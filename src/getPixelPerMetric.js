const getLeftMostContour = (contours) => {
  let leftmostX = Infinity;
  let leftmostIndex = -1;

  for(let i = 0; i < contours.size(); i++) {
    const { x } = contours.boundingRect(i);
    if (x < leftmostX) {
      leftmostIndex = i;
      leftmostX = x;
    }
  }

  return contours.boundingRect(leftmostIndex);
}

const closeToOne = a => a >= 1 && a <= 1 + 1e-3
const close = (a, b) => (a > b ? closeToOne(a / b) : closeToOne(b / a));

const getPPM = (refRect, realWidth, realHeight) => {
  const { width, height } = refRect;
  const x = width / realWidth;
  const y = height / realHeight;
  if (close(x, y)) {
    return x/2 + y/2;
  }

  throw new Error('image is not a 90 deg view');
}

exports.getLeftMostContour = getLeftMostContour;
exports.getPPM = getPPM;

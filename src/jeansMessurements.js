const _ = require("lodash/fp");

const sq = x => x * x;
const dx = (a, b) => a.x - b.x;
const dy = (a, b) => a.y - b.y;

const d2p = (a, b) => Math.sqrt(sq(dx(a, b)) + sq(dy(a, b)));

const distancePointSegment = (p, a, b) => {
  const t = (
    (p.x - a.x) * (a.x - b.x) + (p.y - a.y) * (a.y - b.y))
    /
    (sq(a.x - b.x) + sq(a.y - b.y)
  );
  const v = {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t
  };

  return d2p(v, p);
};

module.exports = points => {
  // console.log("points", points);
  const top = _.minBy("y", points).y;
  const bottom = _.maxBy("y", points).y;
  const left = _.minBy("x", points).x;
  const right = _.maxBy("x", points).x;

  // console.log(top, right, bottom, left);

  const upperPart = _.filter(p => p.y - top < (bottom - top) / 4, points);
  // console.log("upperPart", upperPart);
  const topLeft = _.minBy("x", upperPart);
  const topRight = _.maxBy("x", upperPart);
  const waist = d2p(topRight, topLeft);
  // console.log("waist", waist);

  const midVertLine = (right + left) / 2;
  const middlePoint = _.minBy(p => sq(p.x - midVertLine), points);
  // console.log("middlePoint", middlePoint);

  const rise = distancePointSegment(middlePoint, topLeft, topRight);
  // console.log("rise", rise);

  const lowerRightPart = _.filter(
    p => (p.y - top > (bottom - top) / 4 * 3) && (p.x > midVertLine),
    points
  );
  const lowerLeftPart = _.filter(
    p => (p.y - top > (bottom - top) / 4 * 3) && (p.x < midVertLine),
    points
  );
  // console.log("lowerRightPart", lowerRightPart);
  // console.log("lowerLeftPart", lowerLeftPart);

  const innermostLeft = _.maxBy('x', lowerLeftPart);
  const innermostRight = _.minBy('x', lowerRightPart);
  const outerrmostLeft = _.minBy('x', lowerLeftPart);
  const outerrmostRight = _.maxBy('x', lowerRightPart);

  const inseamLeft = d2p(middlePoint, innermostLeft);
  const inseamRight = d2p(middlePoint, innermostRight);

  // console.log('inseamLeft', inseamLeft)
  // console.log('inseamRight', inseamRight)
  const inseam = Math.max(inseamLeft, inseamRight)

  const fullLegLeft = d2p(topLeft, outerrmostLeft)
  const fullLegRight = d2p(topRight, outerrmostRight)
  // console.log('fullLegLeft', fullLegLeft)
  // console.log('fullLegRight', fullLegRight)
  const fullLeg = Math.max(fullLegLeft, fullLegRight)

  return {
    waist,
    rise,
    inseam,
    fullLeg,
  }
};

const i1 = require("../assets/tier/i1.png");
const i2 = require("../assets/tier/i2.png");
const b1 = require("../assets/tier/b1.png");
const b2 = require("../assets/tier/b2.png");
const s1 = require("../assets/tier/s1.png");
const s2 = require("../assets/tier/s2.png");
const g1 = require("../assets/tier/g1.png");
const g2 = require("../assets/tier/g2.png");
const p1 = require("../assets/tier/p1.png");
const p2 = require("../assets/tier/p2.png");
const d1 = require("../assets/tier/d1.png");
const d2 = require("../assets/tier/d2.png");
const m = require("../assets/tier/m.png");
const gm = require("../assets/tier/gm.png");
const ch = require("../assets/tier/ch.png");

type tier = (args: number) => object;

const tier = (exp: number) => {
  if (exp < 30) {
    return {
      name: "아이언1",
      img: i1,
    };
  }
  if (exp < 50) {
    return {
      name: "브론즈2",
      img: b2,
    };
  }
  if (exp < 100) {
    return {
      name: "브론즈1",
      img: b1,
    };
  }
  if (exp < 200) {
    return {
      name: "실버2",
      img: s2,
    };
  }
  if (exp < 300) {
    return {
      name: "실버1",
      img: s1,
    };
  }
  if (exp < 500) {
    return {
      name: "골드2",
      img: g2,
    };
  }
  if (exp < 1000) {
    return {
      name: "골드1",
      img: g1,
    };
  }
  if (exp < 2000) {
    return {
      name: "플래티넘2",
      img: p2,
    };
  }
  if (exp < 3000) {
    return {
      name: "플래티넘1",
      img: p1,
    };
  }
  if (exp < 4000) {
    return {
      name: "다이아2",
      img: d2,
    };
  }
  if (exp < 8000) {
    return {
      name: "다이아1",
      img: d1,
    };
  }
  if (exp < 10000) {
    return {
      name: "마스터",
      img: m,
    };
  }
  if (exp < 15000) {
    return {
      name: "그랜드마스터",
      img: gm,
    };
  }
  if (exp < 20000) {
    return {
      name: "챌린저",
      img: ch,
    };
  }
  return {
    name: "아이언2",
    img: i2,
  };
};

export default tier;

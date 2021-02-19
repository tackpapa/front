const tier = (exp: number) => {
  if (exp < 15) {
    return {
      name: "아이언2",
      img: "i2.png",
    };
  }
  if (exp < 30) {
    return {
      name: "아이언1",
      img: "i1.png",
    };
  }
  if (exp < 50) {
    return {
      name: "브론즈2",
      img: "b2.png",
    };
  }
  if (exp < 100) {
    return {
      name: "브론즈1",
      img: "i1.png",
    };
  }
  if (exp < 200) {
    return {
      name: "실버2",
      img: "s2.png",
    };
  }
  if (exp < 300) {
    return {
      name: "실버1",
      img: "s1.png",
    };
  }
  if (exp < 500) {
    return {
      name: "골드2",
      img: "g2.png",
    };
  }
  if (exp < 1000) {
    return {
      name: "골드1",
      img: "g1.png",
    };
  }
  if (exp < 2000) {
    return {
      name: "플래티넘2",
      img: "p2.png",
    };
  }
  if (exp < 3000) {
    return {
      name: "플래티넘1",
      img: "p1.png",
    };
  }
  if (exp < 4000) {
    return {
      name: "다이아2",
      img: "d2.png",
    };
  }
  if (exp < 8000) {
    return {
      name: "다이아1",
      img: "d1.png",
    };
  }
  if (exp < 10000) {
    return {
      name: "마스터",
      img: "m.png",
    };
  }
  if (exp < 15000) {
    return {
      name: "그랜드마스터",
      img: "gm.png",
    };
  }
  if (exp < 20000) {
    return {
      name: "챌린저",
      img: "ch.png",
    };
  }
};

export default tier;

import {MathConst} from '../math-const.js';

/**
 * @param x
 * @param coefs
 */
function polevl(x, coefs) {
  return coefs.reduce((result, c) => result * x + c, 0);
}

/**
 * @param x
 * @param coefs
 */
function p1evl(x, coefs) {
  return coefs.reduce((result, c) => result * x + c, 1);
}

// https://github.com/scipy/scipy/blob/master/scipy/special/cephes/ndtr.c

const P = [
  2.46196981473530512524e-10,
  5.64189564831068821977e-1,
  7.46321056442269912687e0,
  4.86371970985681366614e1,
  1.96520832956077098242e2,
  5.26445194995477358631e2,
  9.34528527171957607540e2,
  1.02755188689515710272e3,
  5.57535335369399327526e2
];

const Q = [
  /* 1.00000000000000000000e0, */
  1.32281951154744992508e1,
  8.67072140885989742329e1,
  3.54937778887819891062e2,
  9.75708501743205489753e2,
  1.82390916687909736289e3,
  2.24633760818710981792e3,
  1.65666309194161350182e3,
  5.57535340817727675546e2
];

const R = [
  5.64189583547755073984e-1,
  1.27536670759978104416e0,
  5.01905042251180477414e0,
  6.16021097993053585195e0,
  7.40974269950448939160e0,
  2.97886665372100240670e0
];

const S = [
  /* 1.00000000000000000000e0, */
  2.26052863220117276590e0,
  9.39603524938001434673e0,
  1.20489539808096656605e1,
  1.70814450747565897222e1,
  9.60896809063285878198e0,
  3.36907645100081516050e0
];

const T = [
  9.60497373987051638749e0,
  9.00260197203842689217e1,
  2.23200534594684319226e3,
  7.00332514112805075473e3,
  5.55923013010394962768e4
];

const U = [
  /* 1.00000000000000000000e0, */
  3.35617141647503099647e1,
  5.21357949780152679795e2,
  4.59432382970980127987e3,
  2.26290000613890934246e4,
  4.92673942608635921086e4
];

/**
 * @param x
 */
export function erf(x) {
  if (x < 0) {
    return -erf(-x);
  }
  if (Math.abs(x) > 1) {
    return 1 - erfc(x);
  }
  const z = x * x;
  return x * polevl(z, T) / p1evl(z, U);
}

/**
 * @param a
 */
export function erfc(a) {
  const x = Math.abs(a);
  if (x < 1) {
    return 1 - erf(a);
  }

  const z = -a * a;
  if (z < -MathConst.MAX_LOG) {
    console.log('underflow');
    return a < 0 ? 2 : 0;
  }

  let y = x < 8
    ? Math.exp(z) * polevl(x, P) / p1evl(x, Q)
    : Math.exp(z) * polevl(x, R) / p1evl(x, S);
  if (a < 0) {
    y = 2 - y;
  }
  if (y === 0) {
    console.log('underflow');
    return a < 0 ? 2 : 0;
  }
  return y;
}

// https://github.com/scipy/scipy/blob/master/scipy/special/cephes/ndtri.c

/* approximation for 0 <= |y - 0.5| <= 3/8 */
const P0 = [
  -5.99633501014107895267e1,
  9.80010754185999661536e1,
  -5.66762857469070293439e1,
  1.39312609387279679503e1,
  -1.23916583867381258016e0,
];

const Q0 = [
  /* 1.00000000000000000000e0, */
  1.95448858338141759834e0,
  4.67627912898881538453e0,
  8.63602421390890590575e1,
  -2.25462687854119370527e2,
  2.00260212380060660359e2,
  -8.20372256168333339912e1,
  1.59056225126211695515e1,
  -1.18331621121330003142e0,
];

/* Approximation for interval z = sqrt(-2 log y ) between 2 and 8
 * i.e., y between exp(-2) = .135 and exp(-32) = 1.27e-14.
 */
const P1 = [
  4.05544892305962419923e0,
  3.15251094599893866154e1,
  5.71628192246421288162e1,
  4.40805073893200834700e1,
  1.46849561928858024014e1,
  2.18663306850790267539e0,
  -1.40256079171354495875e-1,
  -3.50424626827848203418e-2,
  -8.57456785154685413611e-4,
];

const Q1 = [
  /*  1.00000000000000000000e0, */
  1.57799883256466749731e1,
  4.53907635128879210584e1,
  4.13172038254672030440e1,
  1.50425385692907503408e1,
  2.50464946208309415979e0,
  -1.42182922854787788574e-1,
  -3.80806407691578277194e-2,
  -9.33259480895457427372e-4,
];

/* Approximation for interval z = sqrt(-2 log y ) between 8 and 64
 * i.e., y between exp(-32) = 1.27e-14 and exp(-2048) = 3.67e-890.
 */

const P2 = [
  3.23774891776946035970e0,
  6.91522889068984211695e0,
  3.93881025292474443415e0,
  1.33303460815807542389e0,
  2.01485389549179081538e-1,
  1.23716634817820021358e-2,
  3.01581553508235416007e-4,
  2.65806974686737550832e-6,
  6.23974539184983293730e-9,
];

const Q2 = [
  /*  1.00000000000000000000e0, */
  6.02427039364742014255e0,
  3.67983563856160859403e0,
  1.37702099489081330271e0,
  2.16236993594496635890e-1,
  1.34204006088543189037e-2,
  3.28014464682127739104e-4,
  2.89247864745380683936e-6,
  6.79019408009981274425e-9,
];

/**
 * @param y
 */
export function ndtri(y) {
  assert(y >= 0 && y <= 1);
  if (y === 0) {
    return -Infinity;
  }
  if (y === 1) {
    return Infinity;
  }

  let negate = true;
  if (y > 1 - MathConst.EXP_MINUS_2) {
    y = 1 - y;
    negate = false;
  }
  else if (y > MathConst.EXP_MINUS_2) {
    y = y - 0.5;
    const y2 = y * y;
    return (y + y * (y2 * polevl(y2, P0, 4) / p1evl(y2, Q0, 8))) * MathConst.SQRT_2PI;
  }

  const x = Math.sqrt(-2 * Math.log(y));
  const z = 1 / x;
  const x0 = x - Math.log(x) / x;
  const x1 = x < 8
    ? z * polevl(z, P1, 8) / p1evl(z, Q1, 8)
    : z * polevl(z, P2, 8) / p1evl(z, Q2, 8);
  return negate ? x1 - x0 : x0 - x1;
}

// log(ndtri(0.975));
// log(ndtr(ndtri(0.975)));
// log(ndtr(ndtri(0.0)));
// log(ndtr(ndtri(0.01)));
// log(ndtr(ndtri(0.1)));
// log(ndtr(ndtri(0.2)));
// log(ndtr(ndtri(0.3)));
// log(ndtr(ndtri(0.4)));
// log(ndtr(ndtri(0.5)));
// log(ndtr(ndtri(0.6)));
// log(ndtr(ndtri(0.7)));
// log(ndtr(ndtri(0.8)));
// log(ndtr(ndtri(0.9)));
// log(ndtr(ndtri(0.9999)));
// log(ndtr(ndtri(1.0)));
// log(ndtri(ndtr(-5)));
// log(ndtri(ndtr(0)));
// log(ndtri(ndtr(0.1)));
// log(ndtri(ndtr(0.3)));
// log(ndtri(ndtr(0.7)));
// log(ndtri(ndtr(1)));
// log(ndtri(ndtr(1.2)));
// log(ndtri(ndtr(5)));

// log(erf(0.2));
// log(erfInv(erf(0.2)));

// log(erfc(0.2));
// log(erfcInv(erfc(0.2)));

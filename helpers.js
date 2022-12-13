/**
 * NOTE(tyler):
 * would be nice to have readable names
 * Sometimes it can seem like overkill but
 * being as clear with the names, even if you know gcd is
 * greatestCommonDivisor it helps future coders
 *
 * same with commonDivisor
 *
 * There is a balance that can sometimes be difficult to find where
 * the name is very clear but not absurdly long.
 *
 *
*/
const gcd = (a, b) => {
     if (a == 0) {
          return b;
     }
     return gcd(b % a, a);
};

const commDiv = (a, b) => {
     // find gcd of a, b
     let n = gcd(a, b);

     // Count divisors of n.
     let result = 0;
     for (let i = 1; i <= Math.sqrt(n); i++) {
          // if 'i' is factor of n
          if (n % i == 0) {
               // check if divisors are equal
               if (n / i == i) result += 1;
               else result += 2;
          }
     }
     return result;
};

module.exports.commDiv = commDiv;

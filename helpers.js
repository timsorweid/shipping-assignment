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

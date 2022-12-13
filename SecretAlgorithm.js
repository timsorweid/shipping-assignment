const helpers = require("./helpers");
/**
 * exports: { commDiv: () => {} }
 */

const Driver = require("./Driver");
const Address = require("./Address");
const Munkres = require("munkres-js");

const evenShipmentMultiplier = 1.5;
const oddShipmentMultiplier = 1;
const bonusMultiplier = 0.5;

const units = ["Suite", "Apt.", "Unit", "#", "Ste."];

// Build the top secret algorithm
// NOTE(tyler): I would suggest when possible make the filename match the main exported class/function
// If multiple functions being exported use a name that defines the group of functions.
/**
 *
 */
module.exports = class Optimizer {
     constructor(drivers, shipments) {
          this.drivers = drivers.map((name) => new Driver(name));
          this.shipments = shipments.map((name) => new Address(name, units));
     }



     /**
      * NOTE(tyler): Idomatic JavaScript should never use getters for
      * side effects.
      *
      * This should be a function call.
      *
      * createMatrix() {
      *   //
      * }
      *
      * so that you "call" it like
      * myMatrix.createMatrix()
      *
      * getters & setters are supposed to act as
      * data properties with small amounts of transformational logic.
      *
      * This also applies to your getters
      *   get calculateOptimizedIndices()
      *   get calculateTotalSS()
      *
      * These should be converted to methods since they
      * are sideeffects and heavier calculations.
      *
      */
     get createMatrix() {
          // there's probably a more elegant way to build this matrix, but this works

          /**
           * NOTE(tyler): A nested loop isn't necessarily a bad way to build a matrix
           * some may contend for more elegant methods but this is certainly readable
           * and performant.
           * ----
           * i/j/k tend to be the variable names for loop iterators at respective nesting levels
           * I am curious why you chose r/c if there was a reason
           * ----
           * new Array() is a nice clear way to indicte you are making a new array
           * generally speaking JavaScript developers are familiar with the literal
           * array initializer syntax of just [];
           *   e.g. this.matrix = []
           *        this.matrix.push([])
           * usually the reason why you would use the new keyword with the array would
           * be to specify the array length in advance which could be a performance
           * optimization if you know the array length in advance (which you do in this case)
           * What you did isn't wrong it just sits on the fence of 2 different ways
           * arrays tend to get initialized
           *   either    this.matrix = []
           *   or        this.matrix = new Array(this.drivers.length)
           *
           */
          this.matrix = new Array();
          for (let r = 0; r < this.drivers.length; r++) {
               this.matrix.push(new Array());
               for (let c = 0; c < this.shipments.length; c++) {
                    this.matrix[r].push(
                         this.calculateSS(
                              this.drivers[r].normalizedName,
                              this.shipments[c].normalizedAddress
                         )
                    );
               }
          }
          return this.matrix;
     }

     calculateSS(driver, address) {
          let baseSS = 0;
          let bonus = 0;

          /**
           * NOTE(tyler):
           *   Most of what I would talk about tin this function is
           *   personal style.
           * ----
           * I would prefer regular expression literals assigned to a variables with a name
           * just so its absolutely clear to the reader without additional thinking what its doing
           *   e.g. /[aeiouy]/gi is a vowels regex so maybe something like:
           *        const vowelRegexp = /[aeiouy]/gi
           *   Then when I read driver.match(vowelRegexp)
           *   It greatly reduces the additional brain power I have to use to understand whats happening
           * ----
           * This may just be me but for one-line if/elses I really prefer them actually be one line
           * This may have been your editor formatter or something but the line break on
           * baseSS to driver.match feels like it breaks what I want to see in one line if/elses
           * I would have added Curlys if they were going to break lines.
           * Personal preference, so don't take as law.
           */
          //if length of shipment's destination street name is even, the base suitability score is the number of vowel in the driver's name multiple 1.5
          if (address.length % 2 === 0)
               baseSS =
                    driver.match(/[aeiouy]/gi).length * evenShipmentMultiplier;
          // If the length of the shipment's destination street name is odd, the base SS is the numner of consonants in the driver's name multiplied by 1
          else if (address.length % 2 === 1)
               baseSS =
                    driver.match(/[bcdfghjklmnpqrstvwxz]/gi).length *
                    oddShipmentMultiplier;

          // - if the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver's name, the SS is increased by 50% above the base SS
          if (helpers.commDiv(driver.length, address.length) > 1)
               bonus = baseSS * bonusMultiplier;

          return baseSS + bonus;
     }

     // See comments in createMatrix
     get calculateOptimizedIndices() {
          return (this.indices = new Munkres(this.matrix));
     }
     // See comments in createMatrix
     get calculateTotalSS() {
          return (this.totalCost = this.indices.reduce(
               (acc, index) => acc + this.matrix[index[0]][index[1]],
               0
          ));
     }

     prettyOutput() {
          const text = this.indices
               .map(
                    (value) =>
                         `Driver: ${this.drivers[value[0]].name}\nShipment: ${
                              this.shipments[value[1]].name
                         }\n ----`
               )
               .concat(`Total Suitability Score: ${this.totalCost}`);
          text.forEach((match) => console.log(match));
     }
};

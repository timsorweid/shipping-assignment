const helpers = require("./helpers");
const Driver = require("./Driver");
const Address = require("./Address");
const Munkres = require("./node_modules/munkres-js");

const evenShipmentMultiplier = 1.5;
const oddShipmentMultiplier = 1;
const bonusMultiplier = 0.5;

const units = ["Suite", "Apt.", "Unit", "#", "Ste."];

// Build the top secret algorithm
module.exports = class Optimizer {
     constructor(drivers, shipments) {
          this.drivers = drivers.map((name) => new Driver(name));
          this.shipments = shipments.map((name) => new Address(name, units));
     }

     get createMatrix() {
          // there's probably a more elegant way to build this matrix, but this works
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

     get calculateOptimizedIndices() {
          return (this.indices = new Munkres(this.matrix));
     }

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

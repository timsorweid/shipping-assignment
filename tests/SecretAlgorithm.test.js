const Optimizer = require(".././SecretAlgorithm");
const Driver = require(".././Driver");
const Address = require(".././Address");

const optimizer = new Optimizer(
     ["Tim Sorweid", "Charlie Browns"],
     ["123 fake street", "5742 Mainlands street"]
);
const driver = new Driver("Timothy & Curtis@ Sorweid.");
const address = new Address("10232 N. Greenview Dr.", [
     "Suite",
     "Apt.",
     "Unit",
     "#",
     "Ste.",
]);

test("Validating suitability score", async () => {
     expect(optimizer.calculateSS("TimothySorwei", "fakestreet")).toStrictEqual(
          9
     ); // even shipment, 5 vowels in name, no common factor bonus
     expect(
          optimizer.calculateSS("CharlieBrowns", "Mainlandsstreet")
     ).toStrictEqual(9); //odd shipment, 9 consonants in name, no common factor bonus
     expect(
          optimizer.calculateSS(
               "xxxxxxxaaxxxxxxxxxxxxxxxxxx",
               "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          )
     ).toStrictEqual(4.5); // even shipment, 2 vowels in name, common factor bonus
});

test("Validating matrix creation", async () => {
     expect(optimizer.createMatrix).toEqual([
          [9, 9],
          [6, 9],
     ]);
     expect(optimizer.matrix.length).toEqual(2);
});

test("Validating total Suitability Score", async () => {
     optimizer.calculateOptimizedIndices;
     expect(optimizer.calculateTotalSS).toEqual(15);
});

test("Validating name normalization", async () => {
     expect(driver.normalizedName).toEqual("TimothyCurtisSorweid");
});

test("Validating address normalization", async () => {
     expect(address.normalizedAddress).toEqual("NGreenviewDr");
});

// What if I wanted to write a test to compare the size of the arrays coming out of getInputArrays()? Since that function gets data from the cmd line, how would I mock data?

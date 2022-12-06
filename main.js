'use strict';
const Driver = require('./Driver');
const Address = require('./Address');
const Optimizer = require('./SecretAlgorithm');

const shipments = [
    "215 Osinski Manors",
    "9856 Marvin Stravenue",
    "7127 Kathlyn Ferry",
    "987 Champlin Lake",
    "63187 Volkman Garden Suite 447",
    "75855 Dessie Lights",
    "1797 Adolf Island Apt. 744",
    "2431 Lindgren Corners",
    "8725 Aufderhar River Suite 859",
    "79035 Shanna Light Apt. 322",
    "123 Fake St."
];
const names = ["Everardo Welch Sorweid",
    "Orval Mayert",
    "Howard Emmerich",
    "Izaiah Lowe",
    "Monica Hermann",
    "Ellis Wisozk",
    "Noemie Murphy",
    "Cleve Durgan",
    "Murphy Mosciski",
    "Kaiser Sose",
    "Li"];

const optimizer = new Optimizer(names, shipments);
optimizer.createMatrix;
optimizer.calculateOptimizedIndices;
optimizer.calculateTotalSS;
optimizer.prettyOutput();






// Generate the matrix and arrays
// Array 1: Driver name
// Array 2: Shipment street name
// - create array copy to strip out anything but the street name. 
// -- remove numbers, spaces, periods, commas
// Matrix: Each row is the drivers in order, each column is the respective suitability score for that driver for each shipment


// Build a node app
// -- Your program should run on the command line and take as input two newline separated files, 
// -- the first containing the street addresses of the shipment destinations and the second containing the names of the drivers.
// -- The output should be the total SS and a matching between shipment destinations and drivers.



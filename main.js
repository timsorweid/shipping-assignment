"use strict";

const getFileData = require(`./GetFileData`);
const Optimizer = require("./SecretAlgorithm");

const [shipments, names] = getFileData.getInputArrays();
const optimizer = new Optimizer(names, shipments);

/**
 * NOTE(tyler): See comments in SecretAlgorithm.js
 *
 * These should all be function calls and not getter
 * calls.
 *
 * optimizer.createMatrix();
 * optimizer.calculateOptimizedIndices();
 * optimizer.calculateTotalSS();
 *
 * Also depending on how much you would need to actually separate the
 * functions for reuse, you could probably use one
 * "public" method which would call all of these internal methods
 *
 * e.g.
 *
 * optimizer.calculateShipmentScore()
 *  calls: .createMatrix() & calculateOptimizedIndices() & calculateTotalSS()
 *  returns: a data structure containing the shipment scores
 *
 * then use a separate class or method to actually print the pretty output
 * and use the return value as the input.
 *
 * That would better separate concerns and provide a more
 * usable class from the optimizer.
 */
optimizer.createMatrix;
optimizer.calculateOptimizedIndices;
optimizer.calculateTotalSS;
optimizer.prettyOutput();

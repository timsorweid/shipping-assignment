"use strict";

const getFileData = require(`./GetFileData`);
const Optimizer = require("./SecretAlgorithm");

const [shipments, names] = getFileData.getInputArrays();
const optimizer = new Optimizer(names, shipments);

optimizer.createMatrix;
optimizer.calculateOptimizedIndices;
optimizer.calculateTotalSS;
optimizer.prettyOutput();

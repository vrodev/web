"use strict";

const models = require('./db-connect').models
models.Catch.remove({}, console.log)
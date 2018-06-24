const {
  runProd,
  runLocal
} = require('./dist/main');


if (process.env.DEV) {
  runLocal();
} else {
  exports.dialogflowFirebaseFulfillment = runProd();
}

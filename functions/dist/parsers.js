'use strict';

var _xml2js = require('xml2js');

function parseXML(xmlData) {
  return new Promise(function (resolve, reject) {
    (0, _xml2js.parseString)(xmlData, function (err, result) {
      if (err) {
        console.log('Error parsing xml');
        reject(err);
      } else {
        console.log('success parsing xml');
        resolve(result);
      }
    });
  });
} // import node module dependencies


function parseJSON(jsonData) {
  var _jsonData$body$predic = jsonData.body.predictions[0],
      trainTypes = _jsonData$body$predic.direction,
      messages = _jsonData$body$predic.message;


  var unsortedPredictions = [];

  // can be multiple trainTypes for 4th and irving. i.e `Inbound to Caltrain/Ball Park`
  // and `Inbound to Caltrain/Ball Park`. Combine all predictiions for all trainTypes.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = trainTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var trainType = _step.value;
      var trainPredictions = trainType.prediction;

      // loop through trainPredictions of the train type add prediction to `unsortedPredictions` array

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = trainPredictions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var prediction = _step2.value;

          var minutesTo4thAndIrving = parseInt(prediction.$.minutes);
          unsortedPredictions.push(minutesTo4thAndIrving);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    // sort `unsortedPredictions` by earliest prediction to latest prediction and return the earliest 4 predictions
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var predictions = unsortedPredictions.sort(function (a, b) {
    return a - b;
  }).slice(0, 4);

  // also, filter for messages of priority `High`.
  var alerts = messages.filter(function (m) {
    return m.$.priority === 'Normal';
  }).map(function (m) {
    return m.$.text;
  });

  return { predictions: predictions, alerts: alerts };
}

module.exports = {
  parseXML: parseXML,
  parseJSON: parseJSON
};
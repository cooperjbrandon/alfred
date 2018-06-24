'use strict';

function formatTrainResponse(predictions, alerts) {
  if (predictions.length > 1) {
    // add an `and` in the array. ex: [1, 3, 5, 15] => [1, 3, 5, 'and', 15].
    predictions.splice(predictions.length - 1, 0, 'and');
  }

  var predictionText = 'The next inbound N\'s at 4th and Irving are ' + predictions.join(', ') + ' minutes away.';
  var alertText = alerts.length ? 'Be aware: ' + alerts.join(' ') + '.' : ' ';

  return { predictionText: predictionText, alertText: alertText };
}

module.exports = {
  formatTrainResponse: formatTrainResponse
};
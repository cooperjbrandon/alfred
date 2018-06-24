
export function formatTrainResponse (predictions, alerts) {
  if (predictions.length > 1) {
    // add an `and` in the array. ex: [1, 3, 5, 15] => [1, 3, 5, 'and', 15].
    predictions.splice(predictions.length - 1, 0, 'and');
  }

  const predictionText = `The next inbound N's at 4th and Irving are ${predictions.join(', ')} minutes away.`
  const alertText = alerts.length ? `Be aware: ${alerts.join(' ')}.` : ' ';

  return { predictionText, alertText }
}

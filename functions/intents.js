// import node module dependencies
const fetch = require('node-fetch');

// import parser and formater functions
const { parseXML, parseJSON } = require('./parsers');
const { formatTrainResponse } = require('./formatters');

const handleTrainIntent = async (conv) => {
  const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r=N&s=5120';
  const res = await fetch(url);
  const xmlData = await res.text();
  const jsonData = await parseXML(xmlData);
  const { predictions, alerts } = await parseJSON(jsonData);
  const { predictionText, alertText } = await formatTrainResponse(predictions, alerts);

  conv.close(`
    <speak>
      ${predictionText} ${predictionText}
    </speak>
  `);
}

module.exports = {
  handleTrainIntent
};

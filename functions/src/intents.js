// import node module dependencies
import fetch from 'node-fetch';

// import parser and formater functions
import { parseXML, parseJSON } from './parsers';
import { formatTrainResponse } from './formatters';

const handleTrainIntent = async (conv) => {
  try {
    const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r=N&s=5120';
    const res = await fetch(url);
    const xmlData = await res.text();
    const jsonData = await parseXML(xmlData);
    const { predictions, alerts } = await parseJSON(jsonData);
    const { predictionText, alertText } = await formatTrainResponse(predictions, alerts);

    conv.close(`
      <speak>
        ${predictionText} ${alertText}
      </speak>
    `);
  } catch(e) {
    console.log(e);
    conv.close(`
      <speak>
        Sorry! Something went wrong!
      </speak>
    `);
  }
}

module.exports = {
  handleTrainIntent
};

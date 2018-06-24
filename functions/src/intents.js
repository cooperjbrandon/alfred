// import node module dependencies
import fetch from 'node-fetch';
import twilio from 'twilio';

// import parser and formater functions, as well as secrets
import { parseXML, parseJSON } from './parsers';
import { formatTrainResponse } from './formatters';
import { twilioInfo } from '../secrets';

const {
  accountSid,
  authToken,
  fromNumber,
  recipientPhoneNumbers
} = twilioInfo;

export const handleTrainIntent = async (conv) => {
  try {
    const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r=N&s=5120';
    const res = await fetch(url);
    const xmlData = await res.text();
    const jsonData = await parseXML(xmlData);
    const { predictions, alerts } = await parseJSON(jsonData);
    const { predictionText, alertText } = await formatTrainResponse(predictions, alerts);
    const textToSend = `
      <speak>
        ${predictionText} ${alertText}
      </speak>
    `;

    if (process.env.DEV) {
      console.log(textToSend)
    } else {
      conv.close(textToSend);
    }
  } catch(e) {
    console.log(e);
    conv.close(`
      <speak>
        Sorry! Something went wrong!
      </speak>
    `);
  }
}

export const handleFindPhoneIntent = async (conv, { name = 'Brandon' }) => {
  try {
    const client = twilio(accountSid, authToken);
    const callConfig = {
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: recipientPhoneNumbers[name.toUpperCase()],
      from: fromNumber
    };

    const textToSend = `
      <speak>
        Ok! Calling ${name}'s phone.
      </speak>
    `;

    if (process.env.DEV) {
      console.log(textToSend)
    } else {
      conv.close(textToSend);
    }

    const call = await client.calls.create(callConfig);
    console.log(call.sid);
  } catch(e) {
    console.log(e);
    conv.close(`
      <speak>
        Sorry! Something went wrong!
      </speak>
    `);
  }
}

const fetch = require('node-fetch');
const https = require('https');
const csv = require('csv-parser');

const spreadsheetId = '1skbQoZ4Msew2f3mNTlmJVrkY-SLVso-v8lgkWB-nUbs';
const range = 'Sheet1!A1:AZ1000'; // adjust the range to your needs

const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function readSpreadsheet() {
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&range=${range}`;
  const response = await fetch(url, { agent });
  const csvData = await response.text();

  // console.log(csvData);
  const rows = csvData.split('\n').map((row) => row.split(','));
  const headers = rows.shift();

  const data = rows.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      row_quotes_removed = row[index].replace(/"/g, '');
      header_quotes_removed = header.replace(/"/g, '');
      obj[header_quotes_removed] = row_quotes_removed;
    });
    return obj;
  });

  return data;
}

readSpreadsheet().then((data) => {
  console.log(data);
  // Access cells and columns like this:
  // data[0].Column1
  // data[1].Column2
  // etc.
  console.log(data[0]['Pistha (enni grams unnay)'])
});

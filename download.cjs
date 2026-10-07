const https = require('https');
const fs = require('fs');

const url = 'https://www.mfiles.co.uk/mp3-downloads/chopin-nocturne-op9-no2.mp3';
const dest = 'c:/Users/pramo/Documents/Digital Wedding Card/public/audio/jayamangala-piano.mp3';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

https.get(url, options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to get '${url}' (${res.statusCode})`);
    res.resume();
    return;
  }
  const file = fs.createWriteStream(dest);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download completed');
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error(`Error downloading: ${err.message}`);
});

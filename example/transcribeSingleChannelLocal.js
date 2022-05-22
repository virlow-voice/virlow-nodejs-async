/*!
* Virlow
* Copyright(c) 2022 Virlow
* MIT Licensed
*/

// Transcribe SINGLE CHANNEL audio file from local path

const { transcribe } = require('virlow-nodejs-async');

let options = {
    apiKey: "YOUR_API_KEY", // Replace with your API key
    storage: "local", // gcs => Google Cloud Storage, s3 => AWS S3, local => Local path
    file: "YOUR_AUDIO_FILE", //
    dualChannel: false, // true or false
    language: "enUs", // Language of audio file, example: enUs
    punctuate: true,
    webhookUrl: "",
    speakerDiarization: false,
    shortHandNotes: true,
    tldr: true,
    custom: "MY_VALUE"
};

transcribe(options).then(function (result) {
    console.log(result.data);
    console.log(`\nYour Job ID is: ${result.data.id}\n`)
});

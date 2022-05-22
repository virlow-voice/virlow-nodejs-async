/*!
* Virlow
* Copyright(c) 2022 Virlow
* MIT Licensed
*/

const { status } = require('virlow-nodejs-async');

let options = {
    apiKey: "YOUR_API_KEY", // Replace with your API key
    jobId: "YOUR_JOB_ID", // Replace with your JOB ID from the transcribe response
};
status(options).then(function (result) {
    console.log(result.data);
});
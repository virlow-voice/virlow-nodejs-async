# Virlow Speech-to-Text API Node.js Library

The Virlow API can be used to quickly convert pre-recorded audio files and real-time audio streams into accurate text transcriptions. This library allows you to easily use the Virlow API in your Node.js application.


### Features:

- Process local audio files with Virlow
- Speech-to-Text API
- Async Transcription
- Automatic Punctuation
- Word Timings
- Dual Channel
- TL;DR
- Short Hand Notes

## Install

```sh
# using NPM
npm install --save virlow-nodejs-async
```

## Example Usage

### `Dual Channel local audio file`

```js
const { transcribe } = require('virlow-nodejs-async');

let options = {
    apiKey: "YOUR_API_KEY", // Replace with your API key
    storage: "local", // gcs => Google Cloud Storage, s3 => AWS S3, local => Local path
    file: "YOUR_AUDIO_FILE", // Replace with your audio file
    dualChannel: true, // true or false
    language: "enUs", // Language of audio file, example: enUs
    punctuate: true, // true or false
    webhookUrl: "", // Enter your Webhook URL
    speakerDiarization: false, // true or false
    shortHandNotes: true, // true or false
    tldr: true, // true or false
    custom: "MY_VALUE" // Enter your custom value
};

transcribe(options).then(function (result) {
    console.log(result.data);
    console.log(`\nYour Job ID is: ${result.data.id}\n`)
});
```
### `Single Channel local audio file`

```js
const { transcribe } = require('virlow-nodejs-async');

let options = {
    apiKey: "YOUR_API_KEY", // Replace with your API key
    storage: "local", // gcs => Google Cloud Storage, s3 => AWS S3, local => Local path
    file: "YOUR_AUDIO_FILE", //
    dualChannel: false, // true or false
    language: "enUs", // Language of audio file, example: enUs
    punctuate: true, // true or false
    webhookUrl: "", // Enter your Webhook URL
    speakerDiarization: false, // true or false
    shortHandNotes: true, // true or false
    tldr: true, // true or false
    custom: "MY_VALUE" // Enter your custom value
};

transcribe(options).then(function (result) {
    console.log(result.data);
    console.log(`\nYour Job ID is: ${result.data.id}\n`)
});
```

### Required Parameters

* `apiKey` - Required Value

  Include your API key generated from console.voice.virlow.com

* `storage` - Required Value

  In our beta release of this package, it will only accept local audio files. In our upcoming release we will support S3 and Google Cloud Storage. Supported value: `local`


* `file` - Required Value
  Local path of your audio file to be process by the Virlow API. During our beta we will only accept .wav files. We will expand support in our GA release.


* `dual_channel` - Required Value

  Suppose you have a dual-channel audio file, for example. In that case, a phone call recording with the agent on one channel and the customer on the other, the API supports transcribing each channel separately.

  Simply include the dual_channel parameter in your POST request when submitting files for transcription, and set this parameter to `true`.

* `language` - Required Value

  Our initial release of the Virlow API will only accept English US for your submitted audio files.

  The only accepted value is `enUs`

### Optional Parameters

  * `punctuate` - Defaults to `false`
  
    To punctuate the transcription text and case proper nouns, simply include the punctuate parameter in your POST request when submitting files for transcription, and set this parameter to true.

* `webhook_url` - Defaults to `null`
  
  Instead of polling for the result of your transcription, you can receive a webhook once your transcript is complete or if there was an error transcribing your audio file.

  The ability to use a webhook to retrieve your transcription will be introduced in our v1.1.0 Civet release.

* `speaker_diarization` - Defaults to `false`

  The Virlow API can automatically detect the number of speakers in your audio file, and each word in the transcription text can be associated with its speaker. Simply include the speaker_diarization parameter in your POST request, and set this to true.

* `tldr` - Defaults to `false`
  
  TLDR is a common abbreviation for "Too Long Didn't Read." Setting the tldr parameter to true will summarize the transcript processed with the Fala Voice TLDR AI model. The full transcript will also be included in the result object.

* `short_hand_notes` - Defaults to `false`
  
  Short Hand Notes converts your transcript to shorthand notes providing you additional analytics for your audio files. Setting the short_hand_notes parameter to true will add Short Hand Notes to the transcript processed with the Virlow Short Hand Notes AI model. The full transcript will also be included in the result object.

* `custom` - Defaults to `null`

  You can also include a custom value associated with your transcription job. Simply have the custom parameter in your POST request when submitting files for transcription, and set this parameter to YOUR_VALUE.

## Getting the transcription results

```js
const { status } = require('virlow-nodejs-async');

let options = {
    apiKey: "YOUR_API_KEY", // Replace with your API key
    jobId: "YOUR_JOB_ID", // Replace with your JOB ID from the transcribe response
};
status(options).then(function (result) {
    console.log(result);
});
```

## Changes

- 1.0.0
  - first beta release
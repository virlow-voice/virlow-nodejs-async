/*!
* Virlow
* Copyright(c) 2022 Virlow
* MIT Licensed
*/

'use strict';

/**
 * Module dependencies.
 */
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

function transcribe(options) {

    let data = new FormData();

    // Check to validate required keys have been submitted
    if (!options.hasOwnProperty('apiKey')) {
        throw new TypeError('transcribe() options requires an apiKey');
    }
    if (!options.hasOwnProperty('storage')) {
        throw new TypeError('transcribe() options requires you to provide a storage type');
    }
    if (!options.hasOwnProperty('file')) {
        throw new TypeError('transcribe() options requires you to provide a file path');
    }
    if (!options.hasOwnProperty('dualChannel')) {
        throw new TypeError('transcribe() options requires you to specify either true or false for dualChannel');
    }
    if (!options.hasOwnProperty('language')) {
        throw new TypeError('transcribe() requires you to specify either true or false for language');
    }

    // Set optional keys values if they are not provided
    if (!options.hasOwnProperty('shortHandNotes')) {
        options.shortHandNotes = "false";
    }
    if (!options.hasOwnProperty('tldr')) {
        options.tldr = "false";
    }
    if (!options.hasOwnProperty('custom')) {
        options.custom = "";
    }
    if (!options.hasOwnProperty('webhookUrl')) {
        options.webhookUrl = "";
    }
    if (!options.hasOwnProperty('punctuate')) {
        options.punctuate = "false";
    }
    if (!options.hasOwnProperty('speakerDiarization')) {
        options.speakerDiarization = "false";
    }

    // Check storage type for uploading to the Virlow API
    if (options.storage === "local") {
        data.append('audio', fs.createReadStream(options.file));
    } else if (options.storage === "gcs") {
        let remoteFile = options.file;
        data.append('audio', remoteFile.createReadStream());
    } else if (options.storage === "s3") {
        let remoteFile = options.file;
        data.append('audio', remoteFile.createReadStream());
    }
    else {
        throw new TypeError('transcribe() options the storage type to be either gcs, s3 or local');
    }

    // Add user defined parameters to be added to the post request
    data.append('dual_channel', options.dualChannel.toString());
    data.append('punctuate', options.punctuate.toString());
    data.append('webhook_url', options.webhookUrl);
    data.append('speaker_diarization', options.speakerDiarization.toString());
    data.append('language', options.language);
    data.append('short_hand_notes', options.shortHandNotes.toString());
    data.append('tldr', options.tldr.toString());
    data.append('custom', options.custom);

    var config = {
        method: 'post',
        url: `https://api.voice.virlow.com/v1-beta/transcript?x-api-key=${options.apiKey}`,
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    let response = async () => {
        try {
            return await axios(config);
        } catch (err) {
            return err.code;
        }
    };

    return response();

}

function status(options) {

    // Check to validate required keys have been submitted
    if (!options.hasOwnProperty('apiKey')) {
        throw new TypeError('status() options requires an apiKey');
    }
    if (!options.hasOwnProperty('jobId')) {
        throw new TypeError('status() options requires you to provide a jobId');
    }

    var config = {
        method: 'get',
        url: `https://api.voice.virlow.com/v1-beta/transcript/status?x-api-key=${options.apiKey}&id=${options.jobId}`,
    };

    let response = async () => {
        try {
            return await axios(config);
        } catch (err) {
            return err.code;
        }
    };

    return response();
}

/**
 * Expose `transcribe()`.
 */
exports.transcribe = transcribe;

/**
 * Expose `status()`.
 */
exports.status = status;
'use strict';

/**
 * Fetch audio file from url.
 * @param {string} url
 * @return {Promise<ArrayBuffer>}
 */
function fetchAudio (url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.open('GET', url, true);
    req.responseType = 'arraybuffer';

    req.onload = () => {
      if (req.response) {
        resolve(req.response);
      }
      else {
        reject(new Error(`Could not fetch audio data from URL '${url}'`));
      }
    };

    req.send();
  });
}

/**
 * Decode ArrayBuffer to AudioBuffer.
 * @param {AudioContext} ctx
 * @param {ArrayBuffer}  arrayBuffer
 * @return {Promise<AudioBuffer>}
 */
function decodeAudio (ctx, arrayBuffer) {
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(arrayBuffer, (buffer) => {
      resolve(buffer);
    }, (err) => {
      reject(err);
    });
  });
}

/**
 * Fetch and decode sound from URL.
 * @param {AudioContext} ctx
 * @param {string}       url
 * @return {Promise<AudioBuffer>}
 */
module.exports = function loadAudio () {
  return fetchAudio(url).then(decodeAudio);
};

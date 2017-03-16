const { send, json } = require('micro')
const request = require('request')

const createContoursStream = require('./createContoursStream');
const serveFile = require('./serveFile');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    serveFile(req, res);
    return;
  }

  if (req.method !== 'POST') {
    return { error: `NOT SUPPORTED METHOD ${req.method}` }
  }

  const { url, contours, refWidth, refHeight } = await json(req)

  if (!url) {
    return { error: 'url is required' }
  }

  const result = await createContoursStream(
    () => request.get(decodeURIComponent(url)),
    contours || 1,
    refWidth || 1,
    refHeight || 1
  )

  return result;
}

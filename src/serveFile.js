const fs = require('fs')
const { send, json } = require('micro')

module.exports = (req, res) => {
  if (req.url.match(/^\/outputs\/.*/)) {
    res.setHeader('Content-Type', 'image/jpeg')
    send(res, 200, fs.createReadStream(`.${req.url}`));
    return;
  }
  send(res, 404, 'NOT FOUND')
}

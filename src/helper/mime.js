const path = require('path');
const mimeTypes = {
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/wav',
  'xml': 'text/xml'
}

module.exports = (filePath) => {
  let ext = path.extname(filePath) // extname方法返回 filePath 的扩展名
    .split('.')
    .pop()
    .toLowerCase();

    if(!ext) {
      ext = filePath;
    }
    return mimeTypes[ext] || mimeTypes['txt'];
}

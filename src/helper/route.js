const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const Handlebars = require('handlebars');
const config = require('../config/base');
const mime = require('./mime');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString())

module.exports = async function(req, res, filePath) {
  try{
    // fs.stat: 检查文件是否存在
    const stats = await stat(filePath);
    if(stats.isFile()) {
      // 如果是文件，则显示文件内容
      const contenType = mime(filePath);
      res.setHeader('ContentType', contenType);
      if(isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      // 从文件内容中创建一个流，然后通过管道一点一点的返回。
      let rs;
      const {code, start, end} = range(stats.size, req, res);
      if(code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      }else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {start, end});
      }
      if(filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if(stats.isDirectory()){
      // 如果是文件夹，则显示文件夹下的文件
      // fs.readdir:读取目录的内容
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('ContentType', 'text/html');
      const dir = path.relative(config.root, filePath);
      const data = {
        files,
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : ''
      }
      res.end(template(data));
    }
  } catch(ex) {
    res.statusCode = 404;
    res.setHeader('ContentType', 'text/plain');
    res.end(`${filePath} is not a directory or file ${ex.toString()}`);
  }
}

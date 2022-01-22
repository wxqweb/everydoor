module.exports = {
  hostname: '127.0.0.1',
  port: 9876,
  root: process.cwd(), // 进程的当前路径
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600, // 600s
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}

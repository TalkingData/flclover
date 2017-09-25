exports.middleware = [];

exports.logger = {
  // 日志路径
  dir: `${__dirname}/logs`,
  // 日志文件
  appLogName: 'app',
  // 错误文件
  errorLogName: 'error',
  // 日志切割规则，支持按日期或文件大小切割
  file: {
    // 50 M
    maxLogSize: 50 * 1024,
    backups: 3,
    compress: true,
  },
};

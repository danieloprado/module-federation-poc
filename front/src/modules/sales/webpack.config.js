/* eslint-disable @typescript-eslint/no-require-imports */
const sharedConfig = require(__dirname + '/../../webpack.shared.config');

module.exports = sharedConfig({
  name: 'myeduzzsales',
  port: 3001,
  path: __dirname,
  skipHot: true
});

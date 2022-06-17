/* eslint-disable @typescript-eslint/no-require-imports */
const sharedConfig = require(__dirname + '/../../webpack.shared.config');

module.exports = sharedConfig({
  name: 'myeduzzproducts',
  port: 3002,
  path: __dirname,
  skipHot: true
});

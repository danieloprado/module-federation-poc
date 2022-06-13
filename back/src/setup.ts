import moduleAlias from 'module-alias';

moduleAlias.addAlias('~', __dirname);

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('source-map-support').install({ hookRequire: true });

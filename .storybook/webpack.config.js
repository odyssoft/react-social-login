const path = require('path')
const SRC_PATH = path.join(__dirname, '../src')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH],
    use: []
  });
  config.resolve.modules = [path.resolve(__dirname, '../src/'), 'node_modules'];
  config.resolve.extensions.push('.ts', '.tsx');
  return config
}
const common = require('./wdio.common.conf')

exports.config = {
    ...common,
    capabilities: [{
        name: 'wikipedia preview firefox on: '+process.env.ENVIRONMENT,
        platform: "Windows 10",          // Gets latest version by default
        browserName: 'firefox',     // To specify version, add version: "desired version"
    }],
  }
  
const common = require('./wdio.common.conf')

exports.config = {
    ...common,
    capabilities: [{
        name: 'wikipedia preview chrome on: '+process.env.ENVIRONMENT,
        platform: "Windows 10",          // Gets latest version by default
        browserName: 'chrome',     // To specify version, add version: "desired version"
    }],
  }
  
const common = require('./wdio.common.conf')

exports.config = {
    ...common,
    capabilities: [{
        name: 'wikipedia preview safari on: '+process.env.ENVIRONMENT,
        platform: "macOS 10.15",          // Gets latest version by default
        browserName: 'safari',     // To specify version, add version: "desired version"
    }],
  }
  
module.exports = {
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: [
        ['sauce', {
            sauceConnectOpts: {

            }
        }]
    ],
    specs: [
        './test/e2e/specs/**/*.js'
    ],
    framework: 'mocha',
    mochaOpts: {
        timeout: 30000
    }
}
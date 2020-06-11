exports.config = {
    runner                : 'local',
    specs                 : [__dirname + '/bot.js'],
    exclude               : [],
    maxInstances          : 10,
    capabilities          : [{
        maxInstances: 5,
        browserName : 'chrome'
    }],
    logLevel              : 'error',
    deprecationWarnings   : true,
    bail                  : 0,
    baseUrl               : 'http://localhost',
    path                  : '/wd/hub',
    waitforTimeout        : 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount  : 3,
    services              : ['selenium-standalone'],
    framework             : 'mocha',
    reporters             : ['dot', 'spec'],
    mochaOpts             : {
        ui     : 'bdd',
        timeout: 9999999
    },
    onPrepare             : function (config, capabilities) {
    },
    beforeSession         : function (config, capabilities, specs) {
    },
    before                : function (capabilities, specs) {
    },
    beforeCommand         : function (commandName, args) {
    },
    beforeSuite           : function (suite) {
    },
    beforeTest            : function (test) {
    },
    beforeHook            : function () {
    },
    afterHook             : function () {
    },
    afterTest             : function (test) {
    },
    afterSuite            : function (suite) {
    },
    afterCommand          : function (commandName, args, result, error) {
    },
    after                 : function (result, capabilities, specs) {
    },
    afterSession          : function (config, capabilities, specs) {
    },
    onComplete            : function (exitCode, config, capabilities, results) {
    }
}

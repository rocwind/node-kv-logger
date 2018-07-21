var logger = require('./index.js');

// config
logger.config({
    level: 'info',
    format: 'text',
});

// plain text
logger.debug('you won\'t see this debug log as current level is info');
logger.warn('and this one is visible');

// msg, k1, v1, k2, v2
logger.info('connecting...', 'user_id', 12345, 'match_id', 12315);

// k1, v1, k2, v2 ...
logger.info('user_id', 12345, 'match_id', 12315, 'msg', 'connectied');

// k-v by object
logger.error({
    user_id: 12345,
    match_id: 12315,
    msg: 'connection lost.',
});

// msg + k-v object
logger.info('reconnecting...', {
    user_id: 12345,
    match_id: 12315,
});


// ooops, there is no msg key in object
logger.info({
    text: 'forgot the msg key',
});

// the error object
logger.error({
    msg: 'something wrong',
    err: new Error('this is an error'),
});

// now let's bind k-v context to a logger
var loggerWithContext = logger.bindContext({ 'match_id': 12425, 'user_id': 12315 });
loggerWithContext.info('log with context');

// 2nd level of context binding
var loggerWithSubContext = loggerWithContext.bindContext({ 'worker_id': 'a' });
loggerWithSubContext.info('log with sub context');


// config to json output and debug level
// Don't do this in real code, config should be only called once as the beginning
logger.config({
    level: 'debug',
    format: 'json',
});

logger.debug('debug message is visible now');

logger.info({
    msg: 'info log with k-v in json',
    user_id: 12451,
})

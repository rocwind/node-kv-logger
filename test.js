var logger = require('./index.js');

logger.config({
    level: 'info',
    format: 'text',
});

logger.info('user_id', 12345, 'match_id', 12315, 'msg', 'connected');
logger.error({
    user_id: 12345,
    match_id: 12315,
    msg: 'connection drops',
});
logger.warn('user_id', 12345, 'msg', 'trying to connection');
logger.debug('user_id', 12345, 'msg', 'failed to connect');
logger.warn('just a plain text log');

var loggerWithContext = logger.bindContext({ 'match_id': 12425, 'user_id': 125 });
loggerWithContext.info('log with context');

var loggerWithSubContext = loggerWithContext.bindContext({ 'worker_id': 'a' });
loggerWithSubContext.error('log with sub context err');

loggerWithSubContext.error({
    msg: 'something wrong',
    err: new Error('this is an error'),
});

'use strict';


// polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}


var levelPriority = {
    'debug': 1,
    'info': 2,
    'warn': 3,
    'error': 4,
}

var config = {
    level: 'debug',
    format: 'text',
}

var updateConfig = function (options) {
    Object.assign(config, options);
}

var padNumberStr = function (num, digest) {
    if (!digest) {
        digest = 2; // default padding
    }
    var bound = 10;
    var prefix = '';
    for (var i = 1; i < digest; i++) {
        if (num < bound) {
            prefix += '0';
        }
        bound *= 10;
    }
    return prefix + num;
}

var getFormatedTime = function () {
    var date = new Date();
    return date.getFullYear() +
        '-' + padNumberStr(date.getMonth() + 1) +
        '-' + padNumberStr(date.getDate()) +
        ' ' + padNumberStr(date.getHours()) +
        ':' + padNumberStr(date.getMinutes()) +
        ':' + padNumberStr(date.getSeconds()) +
        '.' + padNumberStr(date.getMilliseconds(), 3);
}

var format = function (level, args, context) {
    var argsObj = Object.assign({}, context);

    var len = args.length;
    var arg1 = args[0];
    if (len === 1) {
        // single param, could be plain text or k-v object
        if (typeof arg1 !== 'object' || !arg1.msg) {
            // take as plain text
            argsObj.msg = arg1;
        } else {
            // k-v object
            Object.assign(argsObj, arg1);
        }
    } else if (len === 2 && 
        (typeof arg1 === 'string') && 
        arg1 !== 'msg' &&
        (typeof args[1] === 'object')) {
        // msg string + k-v object
        argsObj.msg = arg1;
        Object.assign(argsObj, args[1]);
    } else {
        var start = 0;
        if (len & 1) {
            // odd params, first is msg
            argsObj.msg = arg1;
            start = 1;
        }
        for (var i = start; i < len-1; i += 2) {
            argsObj[args[i]] = args[i+1];
        }
    }

    // add default items
    argsObj.level = level;
    argsObj.time = getFormatedTime();

    // json
    if (config.format === 'json') {
        return JSON.stringify(argsObj); 
    }

    // default text
    return Object.keys(argsObj).map(function (key) {
        return key + '=' + argsObj[key];
    }).join(', ');
}

var createLogMethod = function (level, context) {
    return function () {
        if (levelPriority[level] < levelPriority[config.level]) {
            return;
        }
        console[level](format(level, arguments, context));
    };
}

var createLogger = function (context) {
    var logger = {
        config: updateConfig,

        bindContext: function (subContext) {
            return createLogger(Object.assign({}, context, subContext));
        },
    };
    // add log methods
    Object.keys(levelPriority).forEach(function (level) {
        logger[level] = createLogMethod(level, context);
    });

    return logger;
}

module.exports = createLogger();

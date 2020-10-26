// eslint-disable-next-line max-classes-per-file
import * as Sentry from 'sentry-expo';

class LogManager {
    loggerObj;

    constructor(logger) {
        if (process.env.APP_DEBUG) {
            this.loggerObj = console;
        } else {
            this.loggerObj = logger;
        }

        return this;
    }

    init = () => this.loggerObj.init();

    getLogger = () => this.loggerObj;
}

class SentryLogger {
    hasInitialized = false;

    init = () => {
        if (!this.hasInitialized) {
            Sentry.init({
                dsn: 'https://d50a22b1cafe47d89f1073f47ea6c1de@o457559.ingest.sentry.io/5453717',
                enableInExpoDevelopment: true,
                debug: true,
            });
        }
        this.hasInitialized = true;
    }

    log = (message, data) => {
        let dataStr = '';
        const dataType = typeof data;
        if (dataType === 'object') {
            dataStr = JSON.stringify(data, null, 2);
        } else {
            dataStr = `dataType: ${dataType}`;
        }
        Sentry.captureMessage(`[INFO]: ${message} | ${dataStr}`, (scope) => {
            scope.setExtra('dataObj', data);
            scope.setExtra('dataType', dataType);
            scope.setLevel('info');
            return scope;
        });
    };

    info = (message, data) => this.log(message, data);

    error = (message, exception, data) => {
        Sentry.captureException(exception, (scope) => {
            scope.setExtra('dataObj', data);
            scope.setExtra('dataType', typeof data);
            scope.setExtra('message', message);
            return scope;
        });
    };

    warn = (message, data) => {
        Sentry.captureMessage(`[WARN]: ${message}`, (scope) => {
            scope.setExtra('dataObj', data);
            scope.setExtra('dataType', typeof data);
            scope.setLevel('warning');
            return scope;
        });
    };

    debug = (message, data) => {
        if (process.env.APP_DEBUG) {
            Sentry.captureMessage(message, (scope) => {
                scope.setExtra('dataObj', data);
                scope.setExtra('dataType', typeof data);
                scope.setLevel('debug');
                return scope;
            });
        }
    }

    console = (message, data) => {
        // eslint-disable-next-line no-console
        console.log(message, data);
    }
}

const sentryLogger = new SentryLogger();
export const logManager = new LogManager(sentryLogger);
export const logger = logManager.getLogger();

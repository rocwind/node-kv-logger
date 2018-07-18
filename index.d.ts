export = new Logger;

declare class Logger {
    config(options: object): void;
    bindContext(kvContext: object): Logger;

    debug(msg: string|object): void;
    info(msg: string|object): void;
    warn(msg: string|object): void;
    error(msg: string|object): void;
}

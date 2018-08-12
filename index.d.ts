declare module "node-kv-logger" {
    export class Logger {
        config(options: object): void;
        bindContext(kvContext: object): Logger;

        debug(msg: string|object, ...args: any[]): void;
        info(msg: string|object, ...args: any[]): void;
        warn(msg: string|object, ...args: any[]): void;
        error(msg: string|object, ...args: any[]): void;
    }

    export = new Logger;
}


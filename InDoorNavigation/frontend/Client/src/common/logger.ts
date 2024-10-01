
export default class Logger {
    private static isDev: boolean = __DEV__;

    static log(...args: any[]) {
        if (this.isDev) {
            console.log(...args);
        }
    }

    static error(...args: any[]) {
        if (this.isDev) {
            console.error(...args);
        }
    }

    static warn(...args: any[]) {
        if (this.isDev) {
            console.warn(...args);
        }
    }

}

import colors from "colors"
import moment from "moment"

const isRegex = (input: any): boolean => {
    try {
        new RegExp(input)
    } catch (e) {
        return false
    }

    return true
}

enum LogType {
    Log = "log",
    Error = "error",
    Warn = "warn",
    Debug = "debug",
    Info = "info",
}

abstract class BaseLogger {
    public log(...a: any[]): void {
        this.write(LogType.Log, a)
    }

    public error(...a: any[]): void {
        this.write(LogType.Error, a)
    }

    public warn(...a: any[]): void {
        this.write(LogType.Warn, a)
    }

    public debug(...a: any[]): void {
        this.write(LogType.Debug, a)
    }

    public info(...a: any[]): void {
        this.write(LogType.Info, a)
    }

    private getColor(logType: LogType): colors.Color {
        let color: colors.Color
        switch (logType) {
            case LogType.Log:
                color = colors.cyan
                break
            case LogType.Error:
                color = colors.red
                break
            case LogType.Warn:
                color = colors.yellow
                break
            case LogType.Debug:
                color = colors.blue
                break
            case LogType.Info:
                color = colors.magenta
                break
        }

        return color
    }

    private write(logType: LogType, a: any[]) {
        const color = this.getColor(logType)
        let out = ""

        for (let i=0; i < a.length; i++) {
            let value: string

            if (
                typeof a[i] === "string" ||
                a[i] instanceof Date ||
                moment.isMoment(a[i]) ||
                isRegex(a[i])
            ) {
                value = a[i]
            } else {
                try {
                    value = JSON.stringify( a[i], null, 2 )
                } catch (error) {
                    console.log("Failed to fomat value:", a[i])
                    continue
                }
            }

            out += i === a.length - 1 ? value : value + " "
        }

        out = `${moment()} ${out}`
        console.log(color(out).bold)
    }
}

export default BaseLogger

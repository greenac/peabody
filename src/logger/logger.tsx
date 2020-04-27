class Logger {
  // TODO: Add env vars and route this log to the appropriate location
  public log(...a: any[]): void {
    this.write(...a)
  }

  public warning(...a: any[]): void {
    this.write("Error", ...a)
  }

  public error(...a: any[]): void {
    this.write("Error", ...a)
  }

  private write(...a: any[]): void {
    console.log(...a)
  }
}

const logger = new Logger()

export default logger

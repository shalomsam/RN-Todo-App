class LogManager {
  loggerObj;

  constructor(loggerObj) {
      this.loggerObj = loggerObj || console;
  }
}

export default LogManager;

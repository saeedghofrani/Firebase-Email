
import * as winston from 'winston';
import moment from 'moment';
import { format } from 'winston';

/**
 * Log only the messages the match `level`.
 */
function justSelectedLevel(level) {
  return format(function (info) {
    if (info.level === level) {
      return info;
    }
  })();
}

/**
 * Log only the messages the match `context`.
 */
function justSelectedContext(context) {
  return format(function (info) {
    if (info.context === context) {
      return info;
    }
  })();
}

// Custom date for logging files with date of occupance
const date = new Date();
const newDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(
  -2,
)}-${('0' + date.getDate()).slice(-2)}`;

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const colors = {
    black: '\u001b[30m',
    red: '\u001b[31m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    blue: '\u001b[34m',
    magenta: '\u001b[35m',
    cyan: '\u001b[36m',
    white: '\u001b[37m',
    brightBlack: '\u001b[30;1m',
    brightRed: '\u001b[31;1m',
    brightGreen: '\u001b[32;1m',
    brightYellow: '\u001b[33;1m',
    brightBlue: '\u001b[34;1m',
    brightMagenta: '\u001b[35;1m',
    brightCyan: '\u001b[36;1m',
    brightWhite: '\u001b[37;1m',
    // 
    Bold: '\u001b[1m',
    Underline: '\u001b[4m',
    // 
    reset: '\u001b[0m',
};

const formats = {
  general: winston.format.combine(
    winston.format.colorize(),
    winston.format.ms(),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf((info) => {
      const { timestamp, level, message, meta, ms, context } = info;
      const ts = moment(timestamp).local().format('HH:MM:ss.SSS');
      const metaMsg = meta ? `: ${parser(meta)}` : '';
      return `${ts} [${level}] [${context}]\t ${parser(
        message,
      )} ${metaMsg} [${ms}]`;
    }),
  ),
  fileHttp: winston.format.combine(
    justSelectedContext('HTTP'),
    winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss.SSS' }),
    winston.format.printf((info) => {
      const { timestamp, level, message, meta, ms, context } = info;
      const metaMsg = meta ? `: ${parser(meta)}` : '';
      return `[${level}]\t[${context}]\t[${timestamp}] Message: ${parser(
        message,
      )} Meta: [${metaMsg}] MS: [${ms}]`;
    }),
  ),
  fileInfo: winston.format.combine(
    justSelectedLevel('info'),
    winston.format.timestamp({ format: 'YYYY/MM/DD - HH:mm:ss' }),
    // winston.format.printf(
    //   (info) =>
    //     `[${info.level}]\t[${info.context}]\t[${info.timestamp}] Message: ${info.message}`,
    // ),
  ),
  fileFormat: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY/MM/DD - HH:mm:ss' }),
    // winston.format.printf(
    //   (info) =>
    //     `[${info.level}]\t[${info.context}]\t[${info.timestamp}] Message: ${info.message}`,
    // ),
  ),
  consoleFormat: winston.format.combine(
    //winston.format.colorize({ level: false, message: false }),
    winston.format.ms(),
    winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss.SSS' }),
    winston.format.splat(),
    winston.format.printf((info) => {
      const { timestamp, level, message, meta, ms, context } = info;
      const metaMsg = meta ? `: ${parser(meta)}` : '';

      let mainColor = colors.white;

      switch(level) {
        case 'info':
          mainColor = colors.green;
          break;
        case 'warn':
          mainColor = colors.yellow;
          break;    
        case 'debug':
          mainColor = colors.blue;
          break; 
        case 'error':
          mainColor = colors.red;
          break;                              
      }

      switch(context) {
        case 'BOOTSTRAP':
          mainColor = `${colors.brightWhite}`;
          break; 
        case 'TYPEORM':
          mainColor = colors.brightBlue;
          break;
        case 'WEBSOCKET':
          mainColor = colors.brightMagenta;
          break;  
        case 'CACHE':
          mainColor = colors.brightCyan;
          break;                              
      }      

      return `${colors.brightBlack}[${timestamp}] ${mainColor}[${level}] ${colors.yellow}[${context}] ${mainColor} ${colors.white}Message: ${mainColor}${parser(message)} ${colors.white}Meta: ${mainColor}${metaMsg} ${colors.yellow}[${ms}]${colors.reset}`;
    }),
  ),
};

const transports = {
  http: {
    level: 'trace',
    format: formats.fileHttp,
    prettyPrint: true,
    dirname: `${process.env.LOG_ROOT_PATH}/http/`,
    json: true,
    handleExceptions: false,
    datePattern: 'YYYY-MM-DD-HH',
    filename: `${newDate}.log`,
  },
  info: {
    level: 'info',
    format: formats.fileInfo,
    dirname: `${process.env.LOG_ROOT_PATH}/info/`,
    json: true,
    handleExceptions: false,
    datePattern: 'YYYY-MM-DD-HH',
    filename: `${newDate}.log`,
  },
  error: {
    level: 'error',
    format: formats.fileFormat,
    dirname: `${process.env.LOG_ROOT_PATH}/error/`,
    json: true,
    handleExceptions: false,
    filename: `${newDate}.log`,
  },
  all: {
    levels: customLevels.levels,
    level: process.env.COMBINE_LOG_LEVEL,
    format: formats.fileFormat,
    dirname: `${process.env.LOG_ROOT_PATH}/all/`,
    json: true,
    handleExceptions: false,
    datePattern: 'YYYY-MM-DD-HH',
    filename: `${newDate}.log`,
  },
  exception: {
    format: formats.fileFormat,
    dirname: `${process.env.LOG_ROOT_PATH}/exception/`,
    json: true,
    handleExceptions: false,
    datePattern: 'YYYY-MM-DD-HH',
    filename: `${newDate}.log`,
  },
  console: {
    level: 'debug',
    format: formats.consoleFormat,
    prettyPrint: true,
    json: false,
    handleExceptions: false,
    colorize: true,
    // colorize    : process.stdout.isTTY,
  },
};

const isProductionEnv = process.env.NODE_ENV === 'production';

const parser = (param: any): string => {
  if (!param) {
    return '';
  }
  if (typeof param === 'string') {
    return param;
  }
  return Object.keys(param).length ? JSON.stringify(param, undefined, 2) : '';
};

class Logger {
  private logger: winston.Logger;

  constructor() {}

  get config() {
    winston.addColors(customLevels.colors);
    return {
      // Logs error and fatal for prod and the rest for dev
      level: 'trace', // isProductionEnv ? 'error' : 'trace',
      // We redefine security levels as mentioned
      levels: customLevels.levels,
      // format: formats.general,
      transports: [
        new winston.transports.File(transports.all),
        new winston.transports.File(transports.error),
        new winston.transports.File(transports.http),
        new winston.transports.Console(transports.console)
      ],
    };
  }

  trace(msg: any, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);

  }
  data(msg: any , meta?: any) {
    this.logger.data(msg, meta);
  }
  http(msg: any , meta?: any) {
    this.logger.http(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
    // Use this way to make pm2 put the error log in the error file
    // Set the name of the error file in start.json
    // TODO: extract the printf function to reuse the code
    // console.error(msg, meta);
  }

  fatal(msg: any, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}

/**
 * Examples
 */
// logger.trace({ x: 2 }, { a: 1 });
// logger.trace('hi', { a: 1 });
// logger.trace({ x: 2 }, 'by');
// logger.trace('hi again');
// logger.trace('that its', 'by');

export const logger = new Logger();

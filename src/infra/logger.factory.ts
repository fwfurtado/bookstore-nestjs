import { Logger } from '@nestjs/common';

export class LoggerFactory {
  static getLogger(type: any): Logger {
    const className = Object.getOwnPropertyDescriptors(type).name.value;

    return new Logger(className);
  }
}

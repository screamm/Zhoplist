/**
 * Production-safe logging utility
 * Respects environment mode to reduce console noise in production
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = import.meta.env.MODE === 'development';

  /**
   * Development-only logging - removed in production
   */
  debug(message: string, ...args: unknown[]) {
    if (this.isDevelopment) {
      console.log(message, ...args);
    }
  }

  /**
   * Important system information - always shown
   */
  info(message: string, ...args: unknown[]) {
    console.log(message, ...args);
  }

  /**
   * Warnings - always shown
   */
  warn(message: string, ...args: unknown[]) {
    console.warn(message, ...args);
  }

  /**
   * Errors - always shown
   */
  error(message: string, ...args: unknown[]) {
    console.error(message, ...args);
  }

  /**
   * Performance timing - development only
   */
  time(label: string) {
    if (this.isDevelopment) {
      console.time(label);
    }
  }

  /**
   * Performance timing end - development only
   */
  timeEnd(label: string) {
    if (this.isDevelopment) {
      console.timeEnd(label);
    }
  }
}

export const logger = new Logger();